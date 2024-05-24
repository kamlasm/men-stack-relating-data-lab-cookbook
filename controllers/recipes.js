const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

router.get('/', async (req, res) => {
    const recipes = await Recipe.find({owner: `${req.session.user._id}`})
    res.render('recipes/index.ejs', {recipes,})
})

router.get('/new', (req, res) => {
    res.render('recipes/new.ejs')
})

router.post('/', async (req, res) => {
    try {
        req.body.owner = req.session.user._id
        const recipe = await Recipe.create(req.body)
        res.redirect(`/users/${req.session.user._id}/recipes`)
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }    
})

router.get('/:recipeId', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeId)
        res.render('recipes/show.ejs', {recipe,})
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }       
})

router.delete('/:recipeId', async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.recipeId)
        res.redirect(`/users/${req.session.user._id}/recipes`)
    } catch (error) {
        console.error(error)
        res.redirect('/')      
    }
});

router.get('/:recipeId/edit', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.recipeId)
        res.render('recipes/edit.ejs', {
          recipe,
        })
    } catch (error) {
        res.render('error.ejs', { msg: error.message })
    }
  })

router.put('/:recipeId', async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(req.params.recipeId, req.body, { new: true })
        res.redirect(`/users/${req.session.user._id}/recipes/${recipe._id}`)
    } catch (error) {
        console.error(error)
        res.redirect('/')      
    }
});

module.exports = router;