import java.util.Properties;
import java.util.Scanner;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.common.KafkaException;
import java.util.concurrent.TimeUnit;
import java.net.*;
import java.io.*;
import java.util.Arrays;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.InetSocketAddress;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

public class DataProducer {
    static Runtime rt = Runtime.getRuntime();
    static Properties props = new Properties();
    private static int kafka_port = 9092;
    // file recording server
    private static int recording_server_port = 9094;
    public static File FileRecorder;
    public static BufferedWriter r_out;
    public static Boolean startRecording = false;
    public static String server_addr = "192.168.110.106";

    /*****/

    static class SignalHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange he) throws IOException {
            System.out.println("ON!");
            System.out.println(startRecording);
            System.out.println(r_out == null);
            startRecording = !startRecording;
            if (startRecording) {
                String pathToFile = "./hello.txt";
                // doing somthing to receive string file
                try {
                    r_out = new BufferedWriter(new FileWriter(pathToFile));
                    r_out.write("temperature,humidity,soil humidity,light\n");
                } catch (IOException ioe) {
                    System.out.println(ioe);
                }
            } else {
                r_out.close();
                r_out = null;
            }
        }
    }

    public static void main(String[] args) throws Exception {
        // data recorder server
        HttpServer recorderServer = HttpServer.create(new InetSocketAddress(recording_server_port), 0);
        recorderServer.createContext("/", new SignalHandler());
        recorderServer.start();
        /*********************************************************************************************/

        // Calling Zookeeper server and Kafka server using processes
        boolean is_windows = System.getProperty("os.name").startsWith("Windows");
        Process zookeeperServer;
        Process kafkaServer;
        if (is_windows) {
            zookeeperServer = rt.exec("kafka/bin/windows/zookeeper-server-start.bat kafka/config/zookeeper.properties");
            TimeUnit.SECONDS.sleep(5);
            kafkaServer = rt.exec("kafka/bin/windows/kafka-server-start.bat kafka/config/server.properties");
        } else {
            zookeeperServer = rt.exec("kafka/bin/zookeeper-server-start.sh kafka/config/zookeeper.properties");
            TimeUnit.SECONDS.sleep(5);
            kafkaServer = rt.exec("kafka/bin/kafka-server-start.sh kafka/config/server.properties");
        }
        System.out.println("Waiting for Zookeeper and Kafka server to finish creating...");
        TimeUnit.SECONDS.sleep(5);
        /*********************************************************************************************/

        // Begin kafka producer
        System.out.println("Servers created. Begin streaming data...");
        // Topic name
        String topicName = "basic_topic";
        // Add properties
        props.put("bootstrap.servers", server_addr + ":" + Integer.toString(kafka_port)); // Port must be 9092
        props.put("acks", "all");
        props.put("retries", 1);
        props.put("batch.size", 16384);
        props.put("linger.ms", 1);
        props.put("buffer.memory", 33554432);
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

        System.out.println("Sensors connecting...");
        Producer<String, String> producer = new KafkaProducer(props);
        ServerSocket listen = new ServerSocket(8080);
        boolean connectSensor = true;
        int i = 0;
        while (connectSensor) {
            Socket socket = listen.accept();
            System.out.println("listening..");
            // reading post request from sensor
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            // to concatenate strings gotten
            StringBuilder sb = new StringBuilder();
            // send some response to the sensors
            BufferedWriter out = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
            String s;
            try {
                // keep reading line by line the request
                // store each to string builder
                while ((s = in.readLine()) != null) {
                    System.out.println('>' + s);
                    sb.append(s);
                    out.write("echo Java server: " + s);
                    out.newLine();
                    out.flush();
                }
            } catch (SocketTimeoutException exception) {
                // System.err.println(exception);
                connectSensor = false;
            } catch (IOException e) {
                // ok, connection close, then send the data from sensor to kafka
                out.close();
                socket.close();
                // position of each query to extract the parameters
                int startIndex = sb.indexOf("?temp");
                int tempIndex = sb.indexOf("&?humid");
                int humidIndex = sb.indexOf("&?soilhumid");
                int soil_humidIndex = sb.indexOf("&?light");
                int stopIndex = sb.indexOf(" HTTP");

                // our heroes, the status of smart farm, convert from string to float,
                // prepare for sending
                float temperature = Float.parseFloat(sb.substring(startIndex + 6, tempIndex));
                float humidity = Float.parseFloat(sb.substring(tempIndex + 8, humidIndex));
                float soil_humidity = Float.parseFloat(sb.substring(humidIndex + 12, soil_humidIndex));
                float light = Float.parseFloat(sb.substring(soil_humidIndex + 8, stopIndex));

                // time to send data to kafka server
                float[] obj = { temperature, humidity, soil_humidity, light };
                String result = Arrays.toString(obj);
                producer.send(new ProducerRecord<String, String>(topicName, "1", result));
                // dis is for recording files yo!
                if (r_out != null) {
                    r_out.write("result");
                }
            }
            /*
             * int[] obj = new int[4]; obj[0] = i; obj[1] = i; obj[2] = i; obj[3] = i;
             * String result = Arrays.toString(obj); producer.send(new
             * ProducerRecord<String, String>(topicName, result, result)); i += 1;
             * TimeUnit.SECONDS.sleep(2);
             */
        }
        listen.close(); // destructor
        // close producer and servers
        producer.close();
        System.out.println("Closing servers...");
        // Destroying serves
        kafkaServer.destroy();
        /***********************************************************************************/
    }
}