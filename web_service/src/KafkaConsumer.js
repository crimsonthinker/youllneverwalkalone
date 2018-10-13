var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.Client(),
    consumer = new Consumer(
        client,
        [
            {topic: "basic_topic"}
        ],
        {
            autoCommit: true,
            fromOffset: 'earliest'
        }
    );

consumer.on('message', function (message) {
    console.log(message);
});
 
consumer.on("error", function(err) {
    console.log("error", err);
});
 
process.on("SIGINT", function() {
    consumer.close(true, function() {
        process.exit();
    });
});