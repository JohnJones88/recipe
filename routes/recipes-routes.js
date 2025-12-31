const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const Recipe = require('../db/recipes-models');
const { validateToken } = require('../utils/authentication');
const Users = require('../db/users-models');
const { Op } = require('sequelize');
const Steps = require('../db/steps-models')

router.get('/', validateToken, async (req, res) => {
  try {
    if (req.query.userId) {
      // Fetch recipes for a specific user
      const userId = req.query.userId;
      const recipes = await Recipe.findAll({ where: { userId: userId } });
      
      // Check if recipes exist for the given userId
      if (recipes.length > 0) {
        res.send(recipes);
      } else {
        res.status(404).send("No recipes found for this user.");
      }
    } else {
      // Fetch all recipes
      const recipes = await Recipe.findAll();
      res.send(recipes);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

router.get('/:id', validateToken, async (req, res) => {
  try {
    const findRecipe = await Recipe.findByPk(req.params.id)
    if (!findRecipe) {
      res.status(404).send('The recipe is not found.');
      return;
    }
    res.send(findRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }
})

router.post('/', validateToken, async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).send('Name must have a value.')
      return;
    }
    if (!req.body.food_Type) {
      res.status(400).send('Meat Type must have a value.')
      return;
    }
    /*if (!req.body.meat_Type) {
      res.status(400).send('Meat Type must have a value.')
      return;
    }
    if (!req.body.non_Meat_Type) {
      res.status(400).send('Non Meat Type must have a value.')
      return;
    } */
    if (!req.body.description) {
      res.status(400).send('description must have a value.')
      return;
    }
    if (!req.body.step) {
      res.status(400).send('Step must have a value.')
      return;
    }
    if (!req.body.imageUrl) {
      res.status(400).send('Image must have a value.')
      return;
    }
    let newRecipe = await Recipe.create({
      name: req.body.name,
      //meat_Type: req.body.meat_Type,
      //non_Meat_Type: req.body.non_Meat_Type,
      food_Type: req.body.food_Type,
      description: req.body.description,
      step: req.body.step,
      imageUrl: req.body.imageUrl,
      userId: req.currentUserId

    });
    res.status(201).send(newRecipe);

  } catch (error) {
    if (error.name === "SequelizeDatabaseError" && error.original.sqlMessage.includes('meat_Type')) {
      res.status(400).send("food_Type can only be 'Beef', 'Pork', 'Chicken', 'Plant Based', 'No Meat','Starch', 'Vegetable', 'Dessert', 'Fruit'")
    }
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }
})

router.post('/search', validateToken, async (req, res) => {
  try {

    let whereStatment = {};
    if (req.body.name) {
      whereStatment.name = {
        [Op.like]: `%${req.body.name}%`,
      }
    }
    /*if (req.body.meat_Type) {
      whereStatment.meat_Type = {
        [Op.eq]: req.body.meat_Type,
      }
    }
    if (req.body.non_Meat_Type) {
      whereStatment.non_Meat_Type = {
        [Op.eq]: req.body.meat_Type,
      }
    }*/
    if (req.body.step) {
      whereStatment.steps = {
        [Op.like]: `%${req.body.step}%`,
      }
    }

    let recipe = await Recipe.findAll({
      where: whereStatment
    });
    res.send(recipe)
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }
})

router.put('/:id', validateToken, async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).send("name must be a value")
      return;
    }
    /*if (!req.body.meat_Type) {
      res.status(400).send("Meat Type must be a value")
      return;
    }
    if (!req.body.non_Meat_Type) {
      res.status(400).send("non meat Type must be a value")
      return;
    }*/
    if (!req.body.food_Type) {
      res.status(400).send('Food Type must have a value.')
      return;
    }
    if (!req.body.description) {
      res.status(400).send('description must have a value.')
      return;
    }
    if (!req.body.step) {
      res.status(400).send('step must have a value.')
      return;
    }
    if (!req.body.imageUrl) {
      res.status(400).send('image must have a value.')
      return;
    }
    const toUpdateRecipe = await Recipe.findByPk(req.params.id)
    if (!toUpdateRecipe) {
      res.status(404).send("Recipe is not found")
      return;
    }
    toUpdateRecipe.name = req.body.name,
      /*toUpdateRecipe.meat_Type = req.body.meat_Type,
      toUpdateRecipe.non_Meat_Type = req.body.non_Meat_Type, */
      toUpdateRecipe.food_Type = req.body.food_Type,
      toUpdateRecipe.description = req.body.description,
      toUpdateRecipe.step = req.body.step,
      toUpdateRecipe.imageUrl = req.body.imageUrl

    await toUpdateRecipe.save();
    res.status(200).send();
  } catch (error) {
    if (error.name === "SequelizeDatabaseError" && error.original.sqlMessage.includes('meat_Type')) {
      res.status(400).send("meat_Type can only be Beef, Pork, Chicken,Plant Based, No Meat")
      return;
    }
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }

})
router.delete('/:id', validateToken, async (req, res) => {
  try {
    const deleteRecipe = await Recipe.findByPk(req.params.id);
    await deleteRecipe.destroy();

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }
})
router.get('/userId/:id', async (req, res) => {// localhost5000/recipes?userId=3
  try {
    const findUser = await Users.findByPk(req.params.userId, {
      include: [
        {
          model: Recipe
        }
      ]
    });
    res.send(findUser.recipe);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }
});

router.get('/:recipeId/steps', validateToken, async (req, res) => {
  try {
    const findRecipe = await Recipe.findByPk(req.params.recipeId, {
      include: [
        {
          model: Steps
        }
      ]
    });

    res.send(findRecipe.steps);
  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)
  }
});

router.post('/:recipeId/steps', validateToken, async (req, res) => {
  try {
    //create steps in the database
    const toCreateStep = await Steps.create({
      recipeId: req.params.recipeId,
      sortNumber: req.body.sortNumber,
      description: req.body.description

    })
    //send response 201 to user and newly created step
    res.status(201).send(toCreateStep);

  } catch (error) {
    console.log(error);
    res.status(500).send(`Internal Server Error ${error}`)

  }
})


module.exports = router;