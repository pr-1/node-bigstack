const express = require('express');
const passport = require('passport');

const personsController = require('../../controllers/auth');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({auth: 'success'});
});

// @METHOD: POST
// @PATH: /api/auth/register
// @DESC: create new user to database
// @ACCESS: public
router.post('/register', personsController.createUser);

// @METHOD: POST
// @PATH: /api/auth/login
// @DESC: login the user
// @ACCESS: public
router.post('/login', personsController.login);

// @METHOD: GET
// @PATH: /api/auth/me
// @DESC: get the user profile
// @ACCESS: private
router.get('/me', passport.authenticate('jwt', {session: false}), personsController.getProfile);

module.exports = router;