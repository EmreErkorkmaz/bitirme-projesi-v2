

//Kullanılan kütüphaneler tanımlanıyor
const SerialPort = require('./serialPortList')
const mqtt = require('mqtt');
const mqttParameters = require('./adafruitInfo');

//mqtt sunucuya bağlanılıyor


var client = mqtt.connect(mqttParameters.brokerURL,{
    port: mqttParameters.port,
    username: mqttParameters.username,
    password: mqttParameters.password,
    rejectUnauthorized: false

});


//Seri port işlemleri için gerekli nesneler oluşturuluyor.
const Readline = require('@serialport/parser-readline')
const seriPort = new SerialPort("/dev/ttyUSB0", { baudRate: 115200 })
const parser = new Readline()

seriPort.pipe(parser)

parser.on('data', function (gelenVeri) {
    console.log(gelenVeri);
    var array = gelenVeri.split(":");
    console.log(array[0]); //button
    console.log(array[1]); //temp
    

    
    client.publish(mqttParameters.topic2, array[1]);
    

    var button=false;

    if (button==false )
        client.publish(mqttParameters.topic1, "OFF");
    else
        client.publish(mqttParameters.topic1, "ON");


})


client.on('connect', () => {
    client.subscribe(mqttParameters.topic1);
});

