const express = require('express');
const bodyParser = require('body-parser');
const moongose = require('mongoose');
const passport = require('passport');

const dbUrl = require('./src/config/setup/db').databaseUrl;
const routes = require('./src/routes/api');

const app = express();
const port = process.env.port || 3000;


// Middleware for body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport config
app.use(passport.initialize());
require('./src/strategies/passport-jwt')(passport);

console.log(dbUrl);


// Public routes
app.get('/', (req, res) => {
    res.json({ status: 'Public route' })
});

// Actual Routes

app.use('/api', routes);
app.use((error, req, res, next) => {
    console.log("Error middleware");
    let statusCode = error.statusCode;
    if (!statusCode) {
        statusCode = 500;
    }
    res.status(statusCode).json({ error: error.message });
});


moongose.connect(dbUrl, { useNewUrlParser: true })
    .then(() => {
        console.log('Mongo connected');
        app.listen(port, console.log('server shuru'));
    })
    .catch((err) => {
        console.log(err);
    });