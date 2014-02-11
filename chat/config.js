//dev environment settings
exports.port = 9090
exports.host = 'localhost'

//redis
exports.redisPort = 6379
exports.redisPassword = ''
exports.redisDB = 0

//salt factor
exports.SALT_WORK_FACTOR

//db path
exports.db = 'mongodb://localhost/holla'

//npm config settings
exports.npm =
    { loglevel: "warn"
    , registry: "http://holla.la"
    , "strict-ssl": false
    , _auth: ""
    , username: ""
    , _password: ""
    }

exports.gravatar = {
     s: '230'
    , r: 'pg'
}

// bunyan config
var now = new Date()
, logFileName = './log/holla-' + now.getFullYear() + "-"+ now.getMonth() + "-" + now.getDay() +'.log'

exports.log =
  { name: 'holla'
  , level: 'trace'
  , streams: [
        {
            stream: process.stdout,
            level: 'trace'
        },
        {
            path: logFileName,
            level: 'trace'
        }
    ]
}

if (module === require.main) {
      // just show the configs
    if (process.argv[2])
        console.log(exports[process.argv[2]])
    else
        console.log(exports)
    process.exit(0)
}
