var request = new XMLHttpRequest();
var port = 9094;
var ip_addr = "172.20.0.1";
request.open('GET', 'http:/' + ip_addr + ":" + port.toString(), true);
request.send()