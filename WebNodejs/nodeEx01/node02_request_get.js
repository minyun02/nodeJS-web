//1. http객체 생성
var http = require('http');
// 접속 url을 객체화하기 위하여 생성
var url = require('url');
// 접속한 url에서 변수와 데이터를 객체로 만드는 모듈을 생성
var querystring = require('querystring');

//2. http객체를 이용하여 서버생성
var server = http.createServer(function(request, response){
	// 클라이언트에서 get방식으로 데이터를 서버로 보낸경우
	//1. 클라이언트가 접속한 url주소를 파싱한다.
	var parseUrl = url.parse(request.url);
	//2. 파싱된 url을 이용하여 String만 따로 객체를 생성하여 Json으로 만들어 준다.
	var parseQuery = querystring.parse(parseUrl.query, '&', '=');
	
	/*
	 * 		{"num":1234, "username":"홍길동","tel":"010-1234-1234"}
	 */
	//서버가 받은 데이터를 클라이언트한테 보내기
	response.writeHead(200, {'Content-Type':'text/html; charset=UTF-8'});
	response.write('<h1>GET방식으로 데이터 전송</h1>');
	response.write('<ol>');
	response.write('<li>번호 : '+ parseQuery.num +"</li>");
	response.write('<li>이름 : '+ parseQuery.username +"</li>");
	response.write('<li>번호 : '+ parseQuery.tel +"</li>");
	response.write("</ol>");
	response.end('<a href="http://127.0.0.1:10002?num=5555&username=이순신&tel=010-2222-2222">클릭</a>');
	
});

//3. 접속대기
server.listen(10002, function(){
	console.log('server start..... http://127.0.0.1:10002?num=1234&username=홍길동&tel=010-1234-1234');
});