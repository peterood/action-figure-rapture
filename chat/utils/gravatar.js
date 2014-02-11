var gravatar = require('gravatar');

function callGravatar(gravatarEmail) {
    if(gravatarEmail) {
        gravatarUrl = gravatar.url(gravatarEmail, {s: config.gravatar.s, r:  config.gravatar.r, d: config.gravatar.d});
    } else {
        gravatarUrl = "http://www.gravatar.com/avatar/00000000000000000000000000000000?s=230";
    }
    return gravatarUrl;
}

module.exports = callGravatar;
