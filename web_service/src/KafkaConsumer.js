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
module.exports = consumer;
/*
consumer.on('message', function (message) {
    kafka_data = message;
    console.log(message);
});
 
consumer.on("error", function(err) {
    console.log("Waiting for Java server to start...");
});
 
process.on("SIGINT", function() {
    consumer.close(true, function() {
        process.exit();
    });
});*/