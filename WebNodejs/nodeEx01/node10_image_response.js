/**
 * 웹브라우저에 이미지 표시
 */

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request,response){
	// 이미지 파일을 읽어서 response 쓰기
	//					파일명			콜백함수
	fs.readFile("../images/11.jpg", function(error, data){
		response.writeHead(200, {"Content-type":"image/jpg"});
		response.write(data);
		response.end();
		console.log("이미지 전송완료.....");
	});
});

server.listen(13001, function(){
	console.log("server start..... http://localhost:13001");
});
