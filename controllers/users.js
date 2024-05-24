const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        const recipes = await Recipe.find({}).populate('owner')
        res.render('users/index.ejs', {users, recipes})
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }
});

router.get('/:userId/show-pantry', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        res.render('users/show-pantry.ejs', {user,})
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }
});

router.get('/:userId/show-recipes', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        const recipes = await Recipe.find({}).populate('owner')
        res.render('users/show-recipes.ejs', {user, recipes})
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }
});

module.exports = router;