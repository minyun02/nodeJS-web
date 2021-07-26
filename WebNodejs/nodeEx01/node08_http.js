/****노드js 전역변수********************************************/
// [1] __filename : 현재 실행중인 파일의 파일명과 절대경로가 저장되어 있는 변수

// [2] __dirname : 현재 실행중인 파일의 절대경로가 저장되어 있는 변수
/*
 * http 모듈
 */

var http = require('http');

var server = http.createServer(function(request, response){
	console.log("누가 먼저 실행되나 테스트 : CreateServer");
	response.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
	response.write("<h1>HTTP 모듈 테스트</h1>");
	response.write("__filename : "+ __filename + "<br>");
	response.write("__dirname : "+ __dirname +"<br>");
	response.end();
});

//1. 클라이언트가 서버에 접속하면 발생하는 이벤트 : connection()
server.on('connection',function(code){
	console.log("Connection Event = "+ code);
	server.emit('close');
});

//2. 클라이언트가 서버에 요청을 보낼때 발생하는 이벤트 : request
server.on('request',function(code){
	console.log("Request Event = " + code);
});

//3. 서버에서 클라이언트에게 응답하면 발생하는 이벤트 : response
server.on('response',function(code){
	console.log("Response Event = " + code);
});

//4. 서버가 종료되면 발생하는 이벤트 : close
server.on('close',function(code){
	console.log("Close Event = " + code);
});

// 클라이언트가 접속을 하면 다음 진행을할수 있도록 접속을 대기하는 역할을 한다.
server.listen(12009, function(){
	console.log("server start.... http://localhost:12009");
});