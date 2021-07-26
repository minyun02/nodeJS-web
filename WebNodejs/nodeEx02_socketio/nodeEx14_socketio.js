/**
 * http://127.0.0.1:14002/chatForm
 */
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response){
	var pathname = request.url;
	if(pathname=='/chatForm'){
		//fs.readFile(__dirname+"/chatingForm1.html", "utf-8", function(error, data){
		fs.readFile(__dirname+"\\chatingForm1.html", "utf-8", function(error, data){
			if(error){
				response.writeHead(200, {'Content-type':'text/html; charset=utf-8'});
				response.end("<h1>404 ERROR PAGE</h1>");
			}else{
				response.writeHead(200, {'Content-type':'text/html; charset=utf-8'});
				response.write(data);
				response.end();
			}
		});
	}else{
		response.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
		response.end("<h1>404 ERROR PAGE</h1>");
	}
});
server.listen(14002, function(){
	console.log("server start...... http://localhost:14002/chatForm");
});
//============================socket.io==================================================
var socketio = require('socket.io');

//1) 소켓 서버를 생성 및 실행
var io = socketio.listen(server);

//2) 클라이언트가 서버에 접속(connection이벤트 발생)하면 접속을 받을 이벤트를 생성한다.
//			'이벤트 종류'
io.sockets.on('connection',function(socket){
	console.log('Client가 접속했다...');
	
	//클라이언트와 통신할 이벤트를 생성
	socket.on('hello', function(data){
		console.log("Server가 받은 메세지 : ", data);
		
		//[1] 모든  접속작에게 서버가 데이터 보내기
		io.sockets.emit('echo','public----->'+ data)
		
		//클라이언트에게 서버가 문자 보내기 이벤트 발생
		//socket.emit('echo', data+'(Welcome!!!!!)');
	});
});
