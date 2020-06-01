var serialport = require("serialport");
var SerialPort = serialport.SerialPort;


serialport.list(function (err, ports) {
    ports.forEach(function(port) {
        console.log(port.comName);
        console.log(port.pnpId);
        console.log(port.manufacturer);
    });
});

module.exports = SerialPort;