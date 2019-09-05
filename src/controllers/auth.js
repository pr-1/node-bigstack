const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Person = require('../models/person');
const key = require('../setup/db').secret;

const createUser = (req, res, next) => {
    let errMsg;
    // if (!req.body.name) {
    //     errMsg = 'Name filed is required.';
    // }
    // if (!req.body.email) {
    //     errMsg = 'Email filed is required.';
    // }

    // if (!req.body.password) {
    //     errMsg = 'Password filed is required.';
    // }
    // if (errMsg) {
    //     const error = new Error(errMsg);
    //     error.statusCode = 400;
    //     throw error;
    // }

    Person.findOne({ email: req.body.email })
        .then((person) => {
            if (person) {
                const error = new Error('User already exists!');
                error.statusCode = 400;
                throw error;
            }
            else {
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
                            }).catch(err => next(err));
                        }
                    });
                });
            }
        })
        .catch(err => {
            console.log("Error occured!")
            next(err);
        });

}

const login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let person;
    let errMsg;
    if (!email) {
        errMsg = 'Email field is required!';
    }
    if (!password) {
        errMsg = 'Password field is required!';
    }
    if (errMsg) {
        const err = new Error(errMsg);
        err.statusCode = 400;
        next(err);
    }

    Person.findOne({ email })
        .then(p => {
            person = p;
            if (!p) {
                const error = new Error('User not found!');
                error.statusCode = 400;
                throw error;
            }
            else {
                return bcrypt.compare(password, p.password);
            }
        })
        .then(r => {
            if (!r) {
                const error = new Error('Incorrect Password!');
                error.statusCode = 400;
                throw error;
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
        .catch(err => {
            console.log('Error occuures');
            next(err);
        });
}

const getProfile = (req, res) => {
    res.json({
        email: req.user.email,
        name: req.user.name,
        profileUrl: req.user.profilePic
    })
}

module.exports = { createUser, login, getProfile };