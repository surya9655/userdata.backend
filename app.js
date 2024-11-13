const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override'); // Import method-override
const bodyParser = require('body-parser');
const router = require('./routes/userroutes.js');

const app = express();
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Use method-override for forms to support PUT and DELETE requests
app.use(methodOverride('_method'));

// Route handling
app.use('/api', router);

// MongoDB connection without deprecated options
mongoose.connect('mongodb://localhost:27017/test')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Database connection error:", err));

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
