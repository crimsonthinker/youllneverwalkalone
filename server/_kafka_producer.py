from kafka import KafkaProducer
import time
producer = KafkaProducer(bootstrap_servers='127.0.0.1:9092')
while(True):
    producer.send('basic_topic',b'hello')
    time.sleep(1)
zk.stop()