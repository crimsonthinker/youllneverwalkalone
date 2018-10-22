var app = require('express')();
var io = require('socket.io').listen(9093);
function callSockets(io, message){
    io.sockets.emit('newMessage', message);
}
var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.Client(),
    consumer = new Consumer(
        client,
        [
            {topic: "basic_topic"}
        ],
        {
            autoCommit: false,
            fromOffset: 'earliest'
        }
    );
consumer.on('message', function (message) {
    callSockets(io,message.value);
    console.log(message.value);
});
 
consumer.on("error", function(err) {
    consumer.pause()
    console.log(err);
    consumer.resume();
});
 
process.on("SIGINT", function() {
    consumer.close(true, function() {
        process.exit();
    });
});
