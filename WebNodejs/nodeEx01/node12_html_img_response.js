/**
 * html문서를 파일 읽기를 하여 웹페이지로 쓰기
 */

var http = require('http');
var fs = require('fs');
var mime = require("Mime");

var server = http.createServer(function(request, response){
	//console.log("request.url===>"+request.url);
	var pathname = request.url;
	if(pathname=='/hello'){
		//비동기식으로 node12_hello.html을 파일읽기하여 response에 쓰기 한다.
		fs.readFile(__dirname+"\\node12_hello.html", 'utf-8', function(err, data){
		//fs.readFile(__dirname+"/node12_hello.html", 'utf-8', function(err, data){
			if(err){
				console.log("html읽기 실패...");
			}else{
				response.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
				response.write(data);
				response.end();
			}
		});
	}else if(pathname=='/page'){
		fs.readFile(__dirname+"\\node12_hello2.html",'utf-8',function(err, data){
			if(err){
				console.log("subpage에러...");
			}else{
				response.writeHead(200, {"Content-type":"text/html; charset=utf-8"});
				response.end(data);
			}
		});
		//						/images/이미지이름.jpg
	}else if(pathname.indexOf("/images")==0){// /images/이미지파일명으로 접속하기
		
		// Mime --> getType(경로와 파일명)	,	mime --> lookup(경로와 파일명)
		var imgPath = pathname.substring(1);
		var mimeType = mime.getType(imgPath); //  images/이미지이름.jpg --> /를 빼고 줘야한다.
		console.log(imgPath + "====>"+mimeType);
		
		fs.readFile("../"+imgPath, function(error, imgData){
			if(error){//fail
				console.log(imgPath+" 읽기 실패..................................");
			}else{//success
				response.writeHead(200, {"Content-type":mimeType});
				response.end(imgData);
			}
		});
		
	}else{
		response.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
		response.end("<h1>404 ERROR PAGE</h1>");
	}
});

server.listen(13004, function(){
	console.log("server start-------> http://localhost:13004");
});