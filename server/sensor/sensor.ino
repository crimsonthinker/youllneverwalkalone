#include <ESP8266WiFi.h>
#include <Base64.h>
#include <DHT.h>
DHT dht;

const char* AP_SSID = "UNKNOW";
const char* AP_PASSWORD = "Minhkhoi98";

const char* host = "192.168.110.103";
const int port = 8080;
const char* URL_TEMP_HUMID = "temp_humid";

const int INPUT_TEMP_HUMID = 4;
const int USER_PWD_LEN = 40;

WiFiClient client;
void wifiConnect() {
  Serial.println();

  WiFi.mode(WIFI_STA);
  WiFi.begin(AP_SSID, AP_PASSWORD);

  Serial.print("Connecting to Wifi Network");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  Serial.print("Wifi Network connected, IP address: ");
  Serial.println(WiFi.localIP());
}

void sendTemperatureHumidityState(float temp, float humid) {
  while (!client.connect(host, port)) {
    Serial.println("Server connection failed");
    wifiConnect();
  }

  String url = "";
  String tempStr = String(temp);
  String humidStr = String(humid);

  url = "/api/temp_humid?temp=" + tempStr + "&humid=" + humidStr + " HTTP/1.1\r\nHost: " + String(host) + "\r\nUser-Agent: arduino\r\n\r\n";

  client.print(String("POST ") + url);
  while(client.available()){
    String line = client.readStringUntil('\r');
    Serial.print(line);
  }
}

void setup()
{
  Serial.begin(115200);
  Serial.println();
  dht.setup(INPUT_TEMP_HUMID);   /* D2 is used for data communication */

  wifiConnect();
  Serial.println("Wifi setting done");
}

void loop()
{
  delay(10000);
  //delay(dht.getMinimumSamplingPeriod());/* Delay of amount equal to sampling period */
  float humidity = dht.getHumidity();/* Get humidity value */
  float temperature = dht.getTemperature();/* Get temperature value */
  Serial.print(dht.getStatusString());/* Print status of communication */
  Serial.print("\t");
  Serial.print(humidity, 1);
  Serial.print(" %\t\t");
  Serial.print(temperature, 1);
  Serial.println(" *C\t\t");
  sendTemperatureHumidityState(temperature, humidity);
}
