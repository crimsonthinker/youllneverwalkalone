#!/bin/bash
(cd server; node app.js)&
(cd server; java -cp ./kafka/libs/*: DataProducer$SignalHandler) &
(sleep 20; cd web_service; node KafkaConsumer.js) &
(cd web_service; npm start)