const express = require('express');
const passport = require('passport');

const router = express.Router();

const profileController = require('../../controllers/profile');
const profileMiddleware = require('../../middlewares/profile');

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

// @METHOD: GET
// @PATH: /api/profile/:username
// @DESC: get the user profile
// @ACCESS: public
router.get(
    '/:username',
    profileController.getProfile
);

// @METHOD: GET
// @PATH: /api/profile
// @DESC: get all user profile
// @ACCESS: public
router.get(
    '/',
    profileController.getAllProfiles
);

module.exports = router;