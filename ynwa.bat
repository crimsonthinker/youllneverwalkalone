cd web_service & npm start &
cd server & javac -cp "./kafka/libs/*" DataProducer.java &
java -cp .kafka/libs/*; DataProducer$SignalHandler &
(timeout /t 10) & cd ../web_service & node KafkaConsumer.js