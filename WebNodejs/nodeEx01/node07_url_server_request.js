var http = require('http');
var url = require('url');

var server = http.createServer(function(request, response){
	console.log("request.url="+request.url);
	//var parsingUrl = url.parse(request.url);
	//console.log("parsingUrl "+ parsingUrl);
	
	if(request.url=="/name"){
		response.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
		response.end("이름은 홍길동입니다");
	}else if(request.url=="/address"){
		response.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
		response.end("주소는 서울시 마포구 백범로입니다.");
	}else if(request.url=="/tel"){
		response.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
		response.end("연락처는 010-1111-2222입니다");
	}else{
		//404
		response.writeHead(404, {"Content-type":"text/html;charset=utf-8"});
		response.end("<h1>404 page not found</h1>");
	}
});

server.listen(12007, function(){
	console.log("server start ==== http://localhost:12007");
});