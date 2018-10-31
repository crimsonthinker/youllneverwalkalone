#include <ESP8266WiFi.h>
#include <Base64.h>
#include <DHT.h>
#include <Wire.h>
#include <BH1750.h>

DHT dht;
BH1750 lightMeter(0x23);

const char* AP_SSID = "UNKNOW";
const char* AP_PASSWORD = "Minhkhoi98";

const char* host = "192.168.110.106";
const int port = 8080;
const char* URL_TEMP_HUMID = "temp_humid";

const int INPUT_TEMP_HUMID = 4;
const int USER_PWD_LEN = 40;

const int YL69 = 5;
const int soil_threshold = 800;

WiFiClient client;
void wifiConnect(){
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

float getHumidityState() {
  float humidity = dht.getHumidity();/* Get humidity value */
  Serial.print(humidity, 1);
  Serial.print(" %\t\t");
  if (!isnan(humidity)) return humidity;
  else return 0.0f;
}

float getTemperatureState() {
  float temperature = dht.getTemperature();/* Get temperature value */
  Serial.print(temperature, 1);
  Serial.print(" *C\t\t");  
  if (!isnan(temperature)) return temperature;
  else return 0.0f;
}

int getSoilHumidity() {
  int sensorValue = analogRead(YL69);
  // Serial.println(sensorValue + "\t\t");
  if (!isnan(sensorValue)) return sensorValue;
  else return 0;
}

float getLight() {
  float lux = lightMeter.readLightLevel();
  Serial.print(lux);
  Serial.println(" lux");
  if (!isnan(lux)) return lux;
  else return 0.0f;
}

void setup()
{
  Serial.begin(115200);
  Serial.println();
  // temperature and humidity sensor setup
  dht.setup(INPUT_TEMP_HUMID);   /* D2 is used for data communication */
  // soil humidity sensor setup
  pinMode(YL69, INPUT);
  // light humidity sensor setup
  Wire.begin(0,2);
  lightMeter.begin();

  wifiConnect();
  Serial.println("Wifi setting done");
}

void loop()
{
  delay(2000);
  float humidity = getHumidityState();
  float temperature = getTemperatureState();
  int soil_humidity = getSoilHumidity();
  float light = getLight();

  while (!client.connect(host, port)) {
    Serial.println("Server connection failed");
    wifiConnect();
  } 
  Serial.println("Server connection success");
  
  String url = "";
  String tempStr = String(temperature);
  String humidStr = String(humidity);
  String soid_humidStr = String(soil_humidity);
  String lightStr = String(light);

  url = "/api/temp_humid?temp=" + tempStr + "&?humid=" + humidStr + "&?soilhumid=" + soid_humidStr + "&?light=" + lightStr + " HTTP/1.1\r\nHost: " + String(host) + "\r\nUser-Agent: arduino\r\n\r\n";
  

  client.print(String("POST ") + url);
  //String message = String(temperature) + "," + String(humidity) + "," + String(soil_humidity) + "," + String(light);
  //client.print(message);
  while(client.available()){
    String line = client.readStringUntil('\r');
    Serial.print(line);
  }
}
