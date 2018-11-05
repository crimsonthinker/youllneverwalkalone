var express = require('express')
var app = express()
var srv = app.listen(9009, function () {
    console.log('Listening on ' + 9009)
})

app.use('/peerjs', require('peer').ExpressPeerServer(srv, {
    debug: true
}))
