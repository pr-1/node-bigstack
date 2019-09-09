const Profile = require('../models/profile');

const updateProfile = (req, res, next) => {
    const userProfile = {};
    console.log(req.body);
    console.log(req.user.id);
    userProfile.user = req.user.id;

    // General information
    if (req.body.username)
        userProfile.username = req.body.username;
    if (req.body.website)
        userProfile.website = req.body.website;
    if (req.body.languages && req.body.languages.length > 0)
        userProfile.languages = req.body.languages;

    // Social information
    userProfile.social = {};
    if (req.body.facebook)
        userProfile.social.facebook = req.body.facebook;
    if (req.body.youtube)
        userProfile.social.youtube = req.body.youtube;
    if (req.body.instagram)
        userProfile.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (profile) {
                // Update the profile
                console.log("1", profile);
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: userProfile },
                    { new: true }
                )
                    .then(p => res.json(p))
                    .catch(err => next(err));
            } else {
                // Save the new user profile
                new Profile(userProfile)
                    .save()
                    .then(p => res.json({ status: "Profile updated sucessfully", profile: p }))
                    .catch(err => next(err));
            }
        })
        .catch(err => next(err));
}

const getProfile = (req, res, next) => {
    const username = req.params.username;
    Profile.findOne({ username: username })
        .populate('user', ['name', 'email', 'profilePic'])
        .then(profile => {
            if (profile) {
                res.json(profile);
            } else {
                res.status(404).json({ message: "Profile not found" });
            }
        });
}

module.exports = { updateProfile, getProfile };