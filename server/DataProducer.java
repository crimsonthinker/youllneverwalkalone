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
  private static int recording_server_port = 9094;
  public static File FileRecorder;
  public static BufferedWriter out;
  public static Boolean startRecording = false;


  static class SignalHandler implements HttpHandler { //ham nhan tin hieu gui tu RecordRequestOn.js
    @Override public void handle(HttpExchange he) throws IOException {
      System.out.println("ON!");
      System.out.println(startRecording);
      System.out.println(out == null);
      startRecording = !startRecording;
      //De khi nhay qua day, thang java nhan dc ip cua client //,cai nay la server no nhan ip cua client de dat ten thui, con gui file phai nguoc lai
      //eh de co gi ve nha ui ngam nghi lai chu nay gio ong noi no tum lum vcl :( 
      //java se luu file do voi ten la ip cua client do.
      //de toi tui coi lai
      //Nho la luc luu file, tach 4 thuoc tinh ra thanh 4 file nha.
      if(startRecording){ //Khuc nay la khuc bat dau ghi du lieu, TODO: Ong sua lai khuc nay sao cho no ghi du lieu len server
        //tuc la ghi du lieu vo may minh ha ????
        String pathToFile = "./hello.txt";
        //doing somthing to receive string file
        try {
          out = new BufferedWriter(new FileWriter(pathToFile));
          out.write("temperature,humidity,soil humidity,light\n");
        }
        catch(IOException ioe) {
          System.out.println(ioe);
        }
      }else{
        out.close();
      }
    }
  }

  public static void main(String[] args) throws Exception {
    //data recorder server
    HttpServer recorderServer = HttpServer.create(new InetSocketAddress(recording_server_port),0);
    recorderServer.createContext("/", new SignalHandler());
    recorderServer.start();
    /*********************************************************************************************/

    // Calling Zookeeper server and Kafka server using processes
    boolean is_windows = System.getProperty("os.name").startsWith("Windows");
    Process zookeeperServer;
    Process kafkaServer;
    if (is_windows) {
      zookeeperServer = rt.exec(
          "kafka/bin/windows/zookeeper-server-start.bat kafka/config/zookeeper.properties");
      TimeUnit.SECONDS.sleep(5);
      kafkaServer = rt.exec(
          "kafka/bin/windows/kafka-server-start.bat kafka/config/server.properties");
    } else {
      zookeeperServer = rt.exec(
          "kafka/bin/zookeeper-server-start.sh kafka/config/zookeeper.properties");
          TimeUnit.SECONDS.sleep(5);
      kafkaServer = rt.exec(
          "kafka/bin/kafka-server-start.sh kafka/config/server.properties");
    }
    System.out.println("Waiting for Zookeeper and Kafka server to finish creating...");
    TimeUnit.SECONDS.sleep(5);
    /*********************************************************************************************/

    //Begin kafka producer
    System.out.println("Servers created. Begin streaming data...");
    // Topic name
    String topicName = "basic_topic";
    // Add properties
    props.put("bootstrap.servers", "localhost:" + Integer.toString(kafka_port)); // Port must be 9092
    props.put("acks", "all");
    props.put("retries", 1);
    props.put("batch.size", 16384);
    props.put("linger.ms", 1);
    props.put("buffer.memory", 33554432);
    props.put("key.serializer",
              "org.apache.kafka.common.serialization.StringSerializer");
    props.put("value.serializer",
              "org.apache.kafka.common.serialization.StringSerializer");

    Producer<String, String> producer = new KafkaProducer(props);
    /*******************************************************************************************/
    /*
    System.out.println("Sensor connecting...");
    ServerSocket listen = new ServerSocket(8080);
    Socket socket = listen.accept();
    BufferedReader in =
        new BufferedReader(new InputStreamReader(socket.getInputStream()));
    BufferedWriter out =
        new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()));
    String s;
    try {
      while ((s = in.readLine()) != null) {
        System.out.println('>' + s);
        out.write("echo Java server: " + s);
        out.newLine();
        out.flush();
      }
    } catch (Exception e) {
      System.out.println("Client close");
      out.close();
      socket.close();
      listen.close();
    }
    */
    for (int i = 0; i < 200; i++) {
      int[] obj = {i, i, i, i};
      String result = Arrays.toString(obj);
      System.out.println(result); //thang nay 1 cai nuala2 2 cai
      if(startRecording){
        out.write(result + "\n");
      }
      producer.send( new ProducerRecord<String, String>(topicName, result, result));
      TimeUnit.SECONDS.sleep(2);
    }

    //destructor
    // close producer and servers
    producer.close();
    System.out.println("Closing servers...");
    // Destroying serves
    kafkaServer.destroy();
    /***********************************************************************************/

  }
}