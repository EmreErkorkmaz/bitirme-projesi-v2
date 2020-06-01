    #include "Adafruit_MQTT.h"
    #include "Adafruit_MQTT_Client.h"
    #include <ESP8266WiFi.h>
    
    byte  Publish;
    unsigned int  temperatureFirst;
    float  temperatureCelcius;
    String  buttonReceiveValue;
    
    #define AIO_SERVER      "io.adafruit.com"
    #define AIO_SERVERPORT  1883
    #define AIO_USERNAME  "berkanaydin94"
    #define AIO_KEY  "aio_blMB75AsVgc0LVpujSV2OkfIb3XZ"
    
    WiFiClient client;
    
    
    Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);
    
    Adafruit_MQTT_Subscribe button = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/button");
    
    boolean MQTT_connect();
    
    boolean MQTT_connect() {  int8_t ret; if (mqtt.connected()) {    return true; }  uint8_t retries = 3;  
                              while ((ret = mqtt.connect()) != 0) { mqtt.disconnect(); delay(2000);  
                              retries--;if (retries == 0) { return false; }} return true;}
    
    Adafruit_MQTT_Publish temp = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/temp");
    
    
    
    
    void setup()
      {
        Publish = 0;
        temperatureFirst = 0;
        temperatureCelcius = 0;
        buttonReceiveValue = "";
        
        pinMode(2,OUTPUT);
        pinMode(16,OUTPUT);
        pinMode(13,OUTPUT);
        
        Serial.begin(115200);

        digitalWrite(2,LOW);
        digitalWrite(16,LOW);
        digitalWrite(13,HIGH);
        
        WiFi.disconnect();
        delay(3000);
        Serial.println("START");
        WiFi.begin("Redmi","deneme123");
         
        while ((!(WiFi.status() == WL_CONNECTED))){
            delay(300);
            Serial.print("..");
          }
        Serial.println("Connected");
        Serial.println("Your IP is");
        Serial.println((WiFi.localIP().toString()));
      
        mqtt.subscribe(&button);
     }
    
    
    void loop(){
         if (Publish >= 4){
              Publish = 0;
              temperatureFirst = analogRead(A0);
              temperatureCelcius = temperatureFirst * 0.48828125;
              if (MQTT_connect()) {
                if (temp.publish(temperatureCelcius)) {
                  digitalWrite(2,LOW);
                  delay(100);
                  digitalWrite(2,HIGH);
                 }
               }
            }
            if (MQTT_connect()) {
                Adafruit_MQTT_Subscribe *subscription_name;
                while ((subscription_name = mqtt.readSubscription(1000))) {
                    if (subscription_name == &button) {
                      buttonReceiveValue = ((char *)button.lastread);
                      
                       if (buttonReceiveValue == "OFF") {
                          digitalWrite(16,LOW);
                          digitalWrite(13,HIGH);
                          } 
                       else {
                          digitalWrite(16,HIGH);
                          digitalWrite(13,LOW);
                       }
                    }
                  }
                }
          Publish = Publish + 1;
      }
