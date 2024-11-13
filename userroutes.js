const express = require('express');
const router = express.Router();
const myModel = require('../models/user.js');

// Render the form for adding a user
router.get('/add', (req, res) => {
    res.render('add');
});

// Add a new user
router.post('/add', async (req, res) => {
    const myData = req.body;
    try {
        const user = new myModel(myData);
        await user.save();
        res.redirect('/api'); // Redirect to homepage to view users after adding
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send("Something went wrong!");
    }
});

// Display all users
router.get('/', async (req, res) => {
    try {
        const users = await myModel.find();
        res.render('home', { users });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send("Something went wrong!");
    }
});

// Render user for editing
router.get('/edit/:id', async (req, res) => {
    try {
        const user = await myModel.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('edit', { user });
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});

// Update user
// Update user
router.post('/edit/:id', async (req, res) => {
    try {
        const user = await myModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.redirect("/api"); // Redirect to the homepage after successful update
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send("Something went wrong!");
    }
});


// Delete user
router.post('/delete/:id', async (req, res) => {
    try {
        const user = await myModel.findByIdAndDelete(req.params.id);
        res.redirect('/api'); // Redirect to homepage after deletion
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send("Something went wrong!");
    }
});

module.exports = router;
