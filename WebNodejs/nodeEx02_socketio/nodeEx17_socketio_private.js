/**
 * http://127.0.0.1:15001/chat
 */
var http = require('http');
var fs = require('fs');
var socketio = require("socket.io");

var server = http.createServer(function(request, response){
	if(request.url=="/chat"){
		fs.readFile(__dirname+'\\chatingForm1.html','utf-8',(error, data)=>{
			if(error){
				response.writeHead(200, {"Content-type":"text/html; charset=utf-8"});
				response.end("File read error....");
			}else{
				response.writeHead(200, {"Content-type":"text/html; charset=utf-8"});
				response.end(data);
			}
		});
	}else{
		response.writeHead(200, {"Content-type":"text/html; charset=utf-8"});
		response.end("404 Page Error......");
	}
});

server.listen(15001, function(){
	console.log("server start====== http://127.0.0.1:15001/chat");
});

///========================================================================================
var io = socketio.listen(server);

//접속을 기다리는 이벤트
io.sockets.on('connection', (socket)=>{
	console.log("클라이언트가 접속함.......");
	console.log('socketId ------>', socket.id);
		
});