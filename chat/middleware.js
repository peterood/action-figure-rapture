
var express = require('express')
    , config = require('./config')
    , RedisStore = require('connect-redis')(express)
    , path     = require('path')
    , cons = require('consolidate')


module.exports = function ( app, publicDirectory ){

    app
    .engine('html', cons.jade)
    .set('view engine', 'jade')
    .set('views', publicDirectory + '/views')
    .use(express.bodyParser())
    .use(express.static(path.join( publicDirectory , '/public' )))
    .use(express.methodOverride())
    .use(express.cookieParser())
        .use(express.session({
        store: new RedisStore({
            host: config.host,
            port: config.redisPort,
            db: config.redisDB,
            pass: config.redisPassword
            }),
        secret: '1234567890QWERTY'
        }))

    .use(express.logger('dev'))
    .use(express.methodOverride())
    .use(express.cookieParser())
    .use(express.errorHandler())
}

