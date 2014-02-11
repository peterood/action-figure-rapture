var mongoose = require('mongoose');

//schema
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
});


//model
exports.User = db.model('User', UserSchema);
