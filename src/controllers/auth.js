const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Person = require('../models/person');

const createUser = (req, res) => {
    Person.findOne({ email: req.body.email })
        .then((person) => {
            if (person) {
                res.status(400).json({ error: 'User already exists!' });
            }
            else {
                if (!req.body.name) {
                    res.status(400).json({ error: 'Name field is required!' });
                }
                if (!req.body.email) {
                    res.status(400).json({ error: 'Email field is required!' });
                }

                if (!req.body.password) {
                    res.status(400).json({ error: 'Password field is required!' });
                }

                const newPerson = new Person({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    profilePic: 'https://porteous.com.au/wp-content/uploads/2016/09/dummy-profile-pic-male-300x300.jpg'
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPerson.password, salt, (err, hash) => {
                        if (err) throw err;
                        else {
                            newPerson.password = hash;
                            newPerson.save().then((person) => {
                                res.json(person)
                            }).catch(err => console.log(err));
                        }
                    });
                });
            }
        })
        .catch(err => console.log(err));

}

module.exports = { createUser };