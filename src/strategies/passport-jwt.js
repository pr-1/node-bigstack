const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const moongose = require('mongoose');

const secret = require('../setup/db').secret;
const Person = moongose.model('person');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;
module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        Person.findOne({ email: jwt_payload.email })
            .then((person => {
                console.log(person);
                if (person) done(null, person);
                else done(null, false);
            }))
            .catch((err) => {
                console.log(err);
                done(err, false);
            });
    }));
};
