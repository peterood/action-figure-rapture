var colors             = require('colors')
 , config              = require('./config')
 , userController      = require('./controllers/userController')


function checkAuth(req, res, next) {
  if (!req.session.isLoggedIn) res.send('You are not authorized to view this page');
  else next();
    console.log('you are logged in');
}

function welcomeMessage(req, res, next) {
    if(req.session.welcome === true) {
        res.redirect('./welcome');
    }
    next();
}

module.exports = exports = function(app, db) {

    //app.param('username', userController.paramUserName);

    app.use( function (req, res, next) {
        res.locals.session = req.session;
        next();
    });

    app.get('/', function(req, res){
        res.render('./index');
    });

    app.get('/createaccount', userController.signupUser);
    app.post('/account', userController.createUser);
       /*
       .get('/updateaccount', userController.updateUser)
       .get('/deleteaccount', userController.deleteUser)
       .get('/:username', userController.profileUser);
*/

       //404
    app.use( function ( req, res, next ) {
        res.status( 404 );

        if(req.accepts('html')) {
            return res.render('./error', {
                title: 'Error 404',
                subtitle: 'You have hit a page that didn\'t exist. Existence really is an imperfect tense that never becomes a present.'
            });
        }

        if(req.accepts('json')) {
            return res.json({ eror: "not found, this in json"});
        }

        //default
        res.type('txt');
        res.send('Error 404, could not find page.');
    })

    //500
    .use( function (err, req, res, next) {
        console.error('error at %s\n', req.url, err);
        res.send(500, 'error code 500, oh snap');
    });
};

