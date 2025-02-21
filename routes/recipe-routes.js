const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const Recipe = require('../db/recipe-models');
const { validateToken } = require('../utils/authentication');
const Users = require('../db/users-models');
const { Op } = require('sequelize');
const Steps = require('../db/steps-models')

router.get('/', validateToken, async (req, res) => {
    try {
      const recipe = await Recipe.findAll();
      res.send(recipe)
    } catch (error) {
      console.log(error);
      res.status(500).send(`Internal Server Error ${error}`)
    }
  })

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
      if (!req.body.meat_Type) {
        res.status(400).send('Meat Type must have a value.')
        return;
      }
      if (!req.body.non_Meat_Type) {
        res.status(400).send('Non Meat Type must have a value.')
        return;
      }
      if (!req.body.steps) {
        res.status(400).send('Step must have a value.')
        return;
      }
      if (!req.body.imageUrl) {
        res.status(400).send('Image must have a value.')
        return;
      }
      let newRecipe = await Recipe.create({
        name: req.body.name,
        meat_Type: req.body.meat_Type,
        non_Meat_Type: req.body.non_Meat_Type,
        steps: req.body.steps,
        imageUrl: req.body.imageUrl,
        userId: req.currentUserId
  
      });
      res.status(201).send(newRecipe);
  
    } catch (error) {
      if (error.name === "SequelizeDatabaseError" && error.original.sqlMessage.includes('meat_Type')) {
        res.status(400).send("meat_Type can only be Beef, Pork, Chicken and Plant Based")
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
      if (req.body.meat_Type) {
        whereStatment.meat_Type = {
          [Op.eq]: req.body.meat_Type,
        }
      }
      if (req.body.non_Meat_Type) {
        whereStatment.non_Meat_Type = {
          [Op.eq]: req.body.meat_Type,
        }
      }
      if (req.body.steps) {
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
      if (!req.body.meat_Type) {
        res.status(400).send("Meat Type must be a value")
        return;
      }
      if (!req.body.non_Meat_Type) {
        res.status(400).send("non meat Type must be a value")
        return;
      }
      if (!req.body.steps) {
        res.status(400).send('steps must have a value.')
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
      toUpdateRecipe.meat_Type = req.body.meat_Type,
      toUpdateRecipe.non_Meat_Type = req.body.non_Meat_Type,
      toUpdateRecipe.steps = req.body.steps,
      toUpdateRecipe.imageUrl = req.body.imageUrl
  
      await toUpdateRecipe.save();
      res.status(200).send();
    } catch (error) {
        if (error.name === "SequelizeDatabaseError" && error.original.sqlMessage.includes('meat_Type')) {
            res.status(400).send("meat_Type can only be Beef, Pork, Chicken and Plant Based")
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
  router.get('/:userId/:id', async (req, res) => {
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

  router.post('/:recipeId/steps', validateToken, async (req, res) =>{
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