const express = require('express');
const passport = require('passport');

const router = express.Router();

const profileController = require('../../controllers/profile');
const profileMiddleware = require('../../middlewares/profile');

router.get('/', (req, res) => {
    res.json({ profile: 'success' });
});

// @METHOD: POST
// @PATH: /api/profile
// @DESC: update or create a user profile
// @ACCESS: private
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    [profileMiddleware.verifyUsername],
    profileController.updateProfile
);

module.exports = router;