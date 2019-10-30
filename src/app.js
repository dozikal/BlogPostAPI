const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();

//Import Routes
const postsRoute = require('./routes/posts');

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postsRoute);


//Routes
app.get('/', (req, res) => {
    res.send('You are on <b>Home</b>.');
});


//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    (err) => {
        if (err === null)
            console.log('Connected to DB');

        else {
            console.log('ERROR: Connect to DB');
            console.log(err);
        }
    })

//Listen
app.listen(3000);
