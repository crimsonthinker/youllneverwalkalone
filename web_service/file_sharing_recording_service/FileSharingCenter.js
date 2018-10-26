//node js
//Listening to new file sharing request and temporary store on our server
//File format: "filename_sender address-receiver address"
const http = require('http');
var formidable = require('formidable');
const server = http.createServer(function (req,res) {
    if (req.url === '/upload'){
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.path;
            var addr = (files.filetoupload.name).split("_");
            var receiver = addr[1].substring(0,addr[1].indexOf("."));
            //make directory
            var mkdirp = require('mkdirp');
            mkdirp('./sharing_folder/' + receiver, function(err) { 
                console.log("Path existed! No need to create.");
            });
            var newpath = './sharing_folder/' + receiver + "/" + addr[0] + ".txt";
            fs.rename(oldpath, newpath, function (err) {
              if (err) throw err;
              res.write('File uploaded and moved!');
              res.end();
            });
        });
    }
});
server.listen(9095);