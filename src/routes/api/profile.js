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

// @METHOD: POST
// @PATH: /api/profile/workrole
// @DESC: add a workrole to user profile
// @ACCESS: private
router.post(
    '/workrole',
    passport.authenticate('jwt', { session: false }),
    profileController.addWorkrole
);

// @METHOD: DELETE
// @PATH: /api/profile/workrole/:w_id
// @DESC: delete a workrole to user profile
// @ACCESS: private
router.delete(
    '/workrole/:w_id',
    passport.authenticate('jwt', { session: false }),
    profileController.deleteWorkrole
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