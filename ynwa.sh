#!/bin/bash
(cd web_service; npm start) &
(cd server; java -cp ./kafka/libs/*: DataProducer$SignalHandler) &
(sleep 20; cd web_service; node KafkaConsumer.js) &
(node server/app.js)