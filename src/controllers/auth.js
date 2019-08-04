const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Person = require('../models/person');
const key = require('../setup/db').secret;

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

const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let person;
    if (!email) {
        res.status(400).json({ error: 'Email field is required!' });
    }

    if (!password) {
        res.status(400).json({ error: 'Password field is required!' });
    }

    Person.findOne({ email })
        .then(p => {
            person = p;
            if (!p) {
                res.status(401).json({ error: 'User not found!' });
            }
            else {
                return bcrypt.compare(password, p.password);
            }
        })
        .then(r => {
            if (!r) {
                res.status(401).json({ error: 'Incorrect password!' });
            } else {
                const token = jwt.sign(
                    { email: person.email, name: person.name, id: person._id },
                    key
                );
                res.status(201).json({
                    email: person.email,
                    name: person.name,
                    profilePic: person.profilePic,
                    token: 'Bearer ' + token
                });
            }
        })
        .catch(err => console.log(err));
}

const getProfile = (req, res) => {
    res.json({
        email: req.user.email,
        name: req.user.name,
        profileUrl: req.user.profilePic
    })
}

module.exports = { createUser, login, getProfile };