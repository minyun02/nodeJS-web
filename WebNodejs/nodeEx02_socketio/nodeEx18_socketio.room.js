/**
 * http://127.0.0.1:15002/chatRoom
 */
var http = require('http');
var fs = require('fs');

var server = http.createServer((request, response)=>{
	response.writeHead(200, {'Content-type':'text/html; charset=utf-8'});
	if(request.url=='/chatRoom'){
		fs.readFile(__dirname+'\\chattingRoom.html','utf-8',(error, data)=>{
			if(error){
				response.end("파일읽기 에러발생!!~~");
			}else{
				response.end(data);
			}
		});
	}else{
		response.writeHead(200, {"Content-type":"text/html; charset=utf-8"});
		response.end("404 Page Error......");
	}
});

server.listen(15002, ()=>{
	console.log("서버 스따뜨============= http://localhost:15002/chatRoom");
});
//=========================================================================
var socketio = require('socket.io');

var io = socketio.listen(server);

//connection 이벤트 생성
io.sockets.on('connection', (socket)=>{
	console.log('클라이언트가 접속했다..');
	
	//방만들기(join)
	var roomName;
	socket.on('join', (data)=>{
		roomName = data;
		socket.join(roomName);
		console.log(roomName+"이 생성됨");
	});
	
	socket.on('message', (msg)=>{
		//같은 방에 있는 접속자에게 받은 메세지 보내기
		io.sockets.in(roomName).emit('response', roomName+"--->"+ msg);
	});
});
