const express = require('express');
const Users = require('../db/users-models');
const bcrypt = require('bcrypt');
const { createToken } = require('../utils/authentication')
const router = express.Router();

router.post('/', async (req, res) => {
    try {

        if (!req.body.user_name) {
            res.status(400).send("Username must exist");
            return;
        }

        if (!req.body.password) {
            res.status(400).send("Password must exist");
            return;
        }

        const userFromDb = await Users.findOne({
            where: {
                user_name: req.body.user_name
            }
        })

        let dbPassword = userFromDb?.password;
        if (!dbPassword) {
            dbPassword = "";
        }

        const validPassword = await bcrypt.compare(req.body.password, dbPassword);
        if (!validPassword) {
            res.status(400).send("Invalid Credentials");
            return;
        }

        const token = createToken(userFromDb);

        res.send({
            token: token
        });

    } catch (error) {

        console.log(error);
        res.status(500).send(`Internal Server Error ${error}`);
    }
})

module.exports = router;