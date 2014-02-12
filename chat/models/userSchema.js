
var config = require("../config")
    , bcrypt = require('bcrypt')
    , mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId
    , SALT_WORK_FACTOR = config.SALT_WORK_FACTOR;


var UserSchema = new mongoose.Schema({
    username: { type: String, trim: true, lowercase: true, required: true }
    , password: { type: String, trim: true, required: true}
    , firstName: { type: String }
    , lastName: { type: String }
    , email: { type: String, trim: true, lowercase: true}
    , phone: { type: String }
    , digest: Boolean
    , created: { type: Date, default: Date.now }
    , lastLogin: { type: Date}
    , gravatar: { type: String, lowercase: true }
})

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema)
