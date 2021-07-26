var http = require('http');
var querystring = require('querystring');
var total = require("./node05Ex_module_create");
var url = require('url');

var server = http.createServer(function(request, response){
	//데이터가 전송되면 데이터를 누적시킬 변수 선언
	var parseUrl = url.parse(request.url);
	var parseQuery = querystring.parse(parseUrl.query, '&', '=');
	
	response.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
	response.write("1. "+total.oddSum(parseQuery.num)+"<br>");
	response.write("2. "+total.evenSum(parseQuery.num)+"<br>");
	response.end("3. "+total.sum(parseQuery.num)+"<br>");
	
});

server.listen(12003, function(){
	console.log("server start~~~~~~ http://127.0.0.1:12003");
});






//var http = require('http');
//
//var myModule = require("./node05Ex_yunCreate");
//
//var server = http.createServer(function(request, response){
//	response.writeHead(200, {"Content-type":"text/html; charset=utf-8"})
//	
//	response.write("<ol><li>1~"+ 5 + "까지의 짝수의 합은 : ="+ myModule.evenSum(5)+"</li>");
//	response.write("<li>1~"+ 5 + "까지의 홀수의 합은 : ="+ myModule.oddSum(5)+"</li>");
//	response.end("<li>1~"+ 5 + "까지의 총 합은 : ="+ myModule.sumCal(5)+"</li></ol>");
//});
//
//server.listen(10005, function(){
//	console.log("server start------- http://127.0.0.1:10005");
//});