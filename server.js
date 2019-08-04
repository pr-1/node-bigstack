const express = require('express');
const bodyParser = require('body-parser');
const moongose = require('mongoose');

const dbUrl = require('./src/setup/db').databaseUrl;
const routes = require('./src/routes/api');

const app = express();

// Middleware for body-parser

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.port || 3000;

console.log(dbUrl);


// Public routes
app.get('/', (req, res) => {
    res.json({ status: 'Public route' })
});

// Actual Routes

app.use('/api',routes);


moongose.connect(dbUrl, { useNewUrlParser: true })
    .then(() => {
        console.log('Mongo connected');
        app.listen(port, console.log('server shuru'));
    })
    .catch((err) => {
        console.log(err);
    })