const JwtStrategy = require('src/strategies/passport-jwt').Strategy;
const ExtractJwt = require('src/strategies/passport-jwt').ExtractJwt;
const moongose = require('mongoose');

const secret = require('../config/setup/db').secret;
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
