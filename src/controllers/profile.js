const Profile = require('../models/profile');

const updateProfile = (req, res, next) => {
    const profile = {};
    console.log(req.body);
    console.log(req.user.id);
    profile.user = req.user.id;

    // General information
    if (req.body.username)
        profile.username = req.body.username;
    if (req.body.website)
        profile.website = req.body.website;
    if (req.body.languages && req.body.languages.length > 0)
        profile.languages = req.body.languages;

    // Social information
    profile.social = {};
    if (req.body.facebook)
        profile.social.facebook = req.body.facebook;
    if (req.body.youtube)
        profile.social.youtube = req.body.youtube;
    if (req.body.instagram)
        profile.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (profile) {
                // Update the profile
                console.log("1",profile);
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profile },
                    { new: true }
                )
                    .then(p => res.json(p))
                    .catch(err => next(err));
            } else {
                // Check for the uniqueness of username
                Profile.findOne({ username: req.body.username })
                    .then(profile => {
                        if (profile) {
                            res.status(400).json({ message: "Username already exists" });
                        } else {
                            // Create a new user profile and save
                            new Profile(profile)
                                .save()
                                .then(p => res.json({ status: "Profile updated sucessfully", profile: p }))
                                .catch(err => next(err));
                        }
                    })
                    .catch(err => next(err));
            }
        })
        .catch(err => next(err));
}

module.exports = { updateProfile };