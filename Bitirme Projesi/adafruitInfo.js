mqttParameters={

    username: 'berkanaydin94',
    password: 'aio_blMB75AsVgc0LVpujSV2OkfIb3XZ',
    topic1 : 'berkanaydin94/feeds/button',
    topic2 : 'berkanaydin94/feeds/temp',
    

    //brokerURL: 'mqtt://localhost',  //local: 'mqtt://localhost' -----  cloud: 'mqtts://io.adafruit.com'
    brokerURL: 'mqtts://io.adafruit.com',
    port: 8883
    //port: 1883 //local:1883   --------  cloud:8883
}
module.exports = mqttParameters;