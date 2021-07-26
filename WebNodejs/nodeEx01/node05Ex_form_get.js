var http = require('http');

var server = http.createServer(function(request, response){
	response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
	
	response.write("<h1>form을 이용한 모듈사용하기</h1>");
	response.write("<form method='get' action='http://127.0.0.1:12003'>");
	response.write("수 입력 : <input type='text' name='num'>");
	response.write("<input type='submit' value='계산하기'>");
	response.end("</form>")
});

server.listen(12002, function(){
	console.log("server start------- http://127.0.0.1:12002");
});