function forgotPasswordEmail(req, res) {
        var email = require('emailjs');

        User.findOne({ email: req.body.email }, function ( err, docs ) {
            req.email = docs[0];
            console.log("start here", req.email, "this email was found");

            //TODO make this hashed and also pulled from a util file
            var server  = email.server.connect({
                user:     EMAIL_ADDRESS,
                password: EMAIL_PASSWORD,
                host:     "smtp.gmail.com",
                ssl:      true
            });

            // send the message and get a callback with an error or details of the message that was sent
            server.send({
                text:    "Here is your password" + req.email.password,
                from:    "NerdMiner  <news@nerdminer.com>",
                to:      "someone <" + req.email.email + ">",
                cc:      "else <mcgarrity@gmail.com>",
                subject: "Reset Password Request"
            }, function(err, message) {
                console.log(err || message);
            });

        });
    }

module.exports = forgotPasswordEmail;
