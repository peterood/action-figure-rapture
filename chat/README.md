Node.js Chat
===
//TODO add a timestamp for the logs, maybe momentum//TODO Creat Bunyan logs

This application uses Bootstrap from Twitter and the javascript librairie SlimScroll.

## Install the three modules :

	- Go to the chat directory and use this command
	- npm install express socket.io jade

## How to use :

	- Run mongo daemon `mongod`
    - Run redis `redis-server`
    - Run redis cli `redis-cli  MONITOR`
    - Run `npm start` from chat root

## REDIS CLI

```
#show users online
smembers onlineUsers
```


### Credits

Creator : [Geekuillaume] (http://geekuillau.me/)
Contributors: [BINGEBOY] (http://jpmcgarrity.com)
