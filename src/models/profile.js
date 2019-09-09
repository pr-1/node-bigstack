const moongose = require('mongoose');
const Schema = moongose.Schema;

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'person'
    },
    username: {
        type: String,
        unique: true,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    languages: {
        type: [String],
    },
    social: {
        youtube: {
            type: String,
            trim: true,
            lowercase: true
        },
        facebook: {
            type: String,
            trim: true,
            lowercase: true
        },
        instagram: {
            type: String,
            trim: true,
            lowercase: true
        }
    },
    workrole: [
        {
            role: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            country: {
                type: String
            },
            from: {
                type: Date
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            details: {
                type: String
            }
        }
    ],
});

module.exports = Profile = moongose.model('profile', profileSchema);