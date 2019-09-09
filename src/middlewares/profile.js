const Profile = require('../models/profile');

const verifyUsername = (req, res, next) => {
    Profile.findOne({ username: req.body.username })
        .then(profile => {
            if (profile) {
                res.status(400).json({ message: "Username already exists!" });
            } else {
                next();
            }
        })
        .catch(err => next(err));
};

module.exports = { verifyUsername };