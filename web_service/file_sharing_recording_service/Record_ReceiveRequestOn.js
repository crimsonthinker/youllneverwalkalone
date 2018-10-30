//javascript
var request = new XMLHttpRequest();
var port = 9094;
var ip_addr = "";
/*TODO: Get ip address from server

*/
request.open('POST', 'http:/' + ip_addr + ":" + port.toString(), true);
request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
var file_location = "Stop";
/*TODO: Get file location of client when pressing button
Return "Stop" if user press "Ngừng ghi dữ liệu"

*/
if(file_location == "Stop"){
    request.send("-1");
}else{
    request.send('{"file_location" : "' + file_location + '","ip_addr" : "' + ip_addr + '"}');
}