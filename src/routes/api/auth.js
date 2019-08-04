const express = require('express');

const createUser = require('../../controllers/auth').createUser;

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ auth: 'success' });
});

// @METHOD: POST
// @PATH: /api/auth/register
// @DESC: create new user to database
router.post('/register', createUser);

module.exports = router;