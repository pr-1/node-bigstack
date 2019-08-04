const express = require('express');

const personsController = require('../../controllers/auth');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ auth: 'success' });
});

// @METHOD: POST
// @PATH: /api/auth/register
// @DESC: create new user to database
router.post('/register', personsController.createUser);

// @METHOD: POST
// @PATH: /api/auth/login
// @DESC: login the user
router.post('/login', personsController.login);

module.exports = router;