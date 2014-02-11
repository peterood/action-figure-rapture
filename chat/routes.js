var colors             = require('colors')
 , config              = require('./config')

var bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    // max of 5 attempts, resulting in a 2 hour lock
    MAX_LOGIN_ATTEMPTS = 5,
    LOCK_TIME = 2 * 60 * 60 * 1000;



//Verify if user is authed or not
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

    /*
    var ContentRoute           = new contentRouteFactory(db);
    var ProductRoute           = new productRouteFactory(db);
    var HomepageRoute          = new homeRouteFactory(db);
    var UserRoute              = new userRouteFactory(db);
    var CollectionRoute        = new collectionRouteFactory(db);
    */

    app.use( function (req, res, next) {
        res.locals.session = req.session;
        next();
    });

    app.get('/logout', function (req, res) {
        delete req.session.user_id;
        res.redirect('/login');
    });

    app.get('/', function(req, res){
        res.render('home.jade');
    });

    app.param('name', function (req, res, next, name){
        User.find({ username: name}, function ( err, docs ) {
            req.user = docs[0];
            next();
        })
    })

    //404
    app.use( function ( req, res, next ) {
        res.status( 404 );

        if(req.accepts('html')) {
            return res.render('./error', {
                title: 'Error 404',
                subtitle: 'You have hit a page that didn\'t exist, perhaps it will or did.'
            });
        }

        if(req.accepts('json')) {
            return res.json({ eror: "not found, this in json"});
        }

        //default
        res.type('txt');
        res.send('Error 404, could not find page.');
    });

    //500
    app.use( function (err, req, res, next) {
        console.error('error at %s\n', req.url, err);
        res.send(500, 'error code 500, oh snap');
    });
};

