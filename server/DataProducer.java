import java.util.Properties;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.KafkaException;
import java.util.concurrent.TimeUnit;

public class DataProducer {
    static Runtime rt = Runtime.getRuntime();
    static Properties props = new Properties();
    public static void main(String[] args) throws Exception{
        //Calling Zookeeper server and Kafka server using processes
        boolean is_windows = System.getProperty("os.name").startsWith("Windows"); 
        Process zookeeperServer;
        Process kafkaServer;
        if (is_windows){
            zookeeperServer = rt.exec("kafka/bin/windows/zookeeper-server-start.bat kafka/config/zookeeper.properties");
            kafkaServer = rt.exec("kafka/bin/windows/kafka-server-start.bat kafka/config/server.properties");
        }else{
            zookeeperServer = rt.exec("kafka/bin/zookeeper-server-start.sh kafka/config/zookeeper.properties");
            kafkaServer = rt.exec("kafka/bin/kafka-server-start.sh kafka/config/server.properties");
        }
        System.out.println("Servers created. Begin srteaming data...");

        //Topic name
        String topicName = "basic_topic";

        //Add properties
        props.put("bootstrap.servers", "localhost:9092"); //Port must be 9092    
        props.put("acks", "all");
        props.put("retries", 1);
        props.put("batch.size", 16384); 
        props.put("linger.ms", 1);  
        props.put("buffer.memory", 33554432);
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

        Producer<String, String> producer = new KafkaProducer(props);
            
        //Trả về số từ 0 tới 1000000
        //TODO: CHỉnh sửa sao cho giữa Java và C tương tác với nhau ờ hàm producer.send
    
        for(int i = 0;i < 10; i++){
            producer.send(new ProducerRecord<String, String>(topicName, Integer.toString(i), Integer.toString(i)));
            TimeUnit.SECONDS.sleep(1);
        }

        //close producer and servers
        producer.close();

        System.out.println("Closing servers...");
        kafkaServer.destroy();
        zookeeperServer.destroy();
    }
}