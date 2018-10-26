//javascript
//Client upload files and specify destination address

//1.Get destination ip address
/*
Trước khi người dùng upload file, chọn danh sách những máy sẽ gửi file
TODO:
Tạo một page chứa danh sách máy (kèm theo đó là user đang hiện hữu trên máy đó), 
người dùng chọn "1" máy muốn gửi file và lưu địa chỉ máy dưới dạng string.
*/
var ip_destination = ""; //nơi chứa


//2. get the file
//tag đề lấy file
//<input id="the-file" name="file" type="file">
var fileInput = document.getElementById('the-file');
var file = fileInput.files[0];
var formData = new FormData();
formData.append('name',file.name + "_" + ip_destination);
formData.append('file', file);

//3. Upload file to server
var server_ip = ""
/*TODO 1: Get server ip address*/
var request = new XMLHttpRequest();

request.open('POST', 'http:/' + server_ip + ":9095/upload", true);
try{
    request.send(formData);
} catch (e){
    console.log(e)
}