

//Kullanılan kütüphaneler tanımlanıyor

const mqtt = require('mqtt');
const mqttParameters = require('./adafruitInfo');

//mqtt sunucuya bağlanılıyor
var client = mqtt.connect(mqttParameters.brokerURL,{
    port: mqttParameters.port,
    username: mqttParameters.username,
    password: mqttParameters.password,
    rejectUnauthorized: false

});

//Veritabanı Sunucu (Mongodb) işlemleri

const url = "mongodb+srv://emreerkorkmaz:admin12345@emreerkorkmazdb-gngbb.mongodb.net/iot-project?retryWrites=true&w=majority"
const db = require('monk')(url);
const collection1 = db.get('Buton Durumu');
const collection2 = db.get('Sıcaklık');

const dateFormat = require('dateformat');


client.on('connect', () => {
    client.subscribe(mqttParameters.topics);
});

// Uzaktan gelen mesajı al

client.on('message', function (topic, message) {

    if (topic === 'berkanaydin94/feeds/temp') {
        
        //Ölçüm zamanını ve ölçülen sıcaklık değerini veritabanına kaydet.
        collection1.insert({"Zaman": dateFormat(Date.now(), "dd.mm.yyyy-hh:MM:ss TT"),"Sıcaklık: ": message.toString().trim()}).
        then((docs) => {
        }).catch((err) => {
            console.log(err);
        }).then(() => db.close())
    }
    if (topic === 'berkanaydin94/feeds/button') {
        

        //Zamanı ve Buton Kontrol verisini  veritabanına kaydet.

        collection2.insert({"Zaman": dateFormat(Date.now(), "dd.mm.yyyy-hh:MM:ss TT"),"Buton: ": message.toString()}).
        then((docs) => {
        }).catch((err) => {
            console.log(err);
        }).then(() => db.close())
    }

});