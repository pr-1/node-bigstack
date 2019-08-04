const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

const secret = require('../setup/db').secret;
const Person = require('../models/person');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey: secret
};
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    Person.findOne({ id: jwt_payload.id })
        .then((person => {
            if (person) done(null, person);
            else done(null, false);
        }))
        .catch((err) => {
            console.log(err);
            done(err, false);
        });
}));
