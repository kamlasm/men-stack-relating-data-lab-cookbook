const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        const pantry = user.pantry
        res.render('foods/index.ejs', {pantry,})
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }
});

router.get('/new', (req, res) => {
    res.render('foods/new.ejs')
});

router.post('/', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        user.pantry.push(req.body)
        await user.save()
        res.redirect(`/users/${req.session.user._id}/foods`)
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }
});

router.delete('/:itemId', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        const item = user.pantry.id(req.params.itemId)
        item.deleteOne()
        await user.save()
        res.redirect(`/users/${req.session.user._id}/foods`)
    } catch (error) {
        console.error(error)
        res.redirect('/')      
    }
});

router.get('/:itemId/edit', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        const item = user.pantry.id(req.params.itemId)
        res.render('foods/edit.ejs', {item,})
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }
});

router.put('/:itemId', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        const item = user.pantry.id(req.params.itemId)
        item.set('name', req.body.name)
        await user.save()
        res.redirect(`/users/${req.session.user_id}/foods`)
    } catch (error) {
        console.error(error)
        res.redirect('/')        
    }
});

module.exports = router;