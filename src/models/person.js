const moongose = require('mongoose');

const Schema = moongose.Schema;

const PersonsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Removing the password form user object

PersonsSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;
    return user;
}

module.exports = Person = moongose.model('person', PersonsSchema);