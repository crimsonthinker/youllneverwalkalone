from kafka import KafkaConsumer
from json import loads

kafka_consumer = KafkaConsumer(
    'basic_topic',
    bootstrap_servers=['127.0.0.1:9092'],
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='app_end',
    )

for message in kafka_consumer:
    print(message.value)