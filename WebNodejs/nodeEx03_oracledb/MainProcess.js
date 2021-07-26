/**
 * http://127.0.0.1:15005/home
 */
var http = require('http');
var fs = require('fs');
var mime = require('Mime');

var express = require('express');
var requestip = require('request-ip');

var ejs = require('ejs');
//============================== JDBC ================================
var oracledb = require('oracledb');
//자동 커밋 세팅
var conn; //DB연결정보를 보관할 전역변수
oracledb.autoCommit=true;
//db연결정보 설정
oracledb.getConnection({
	user : 'c##scott',
	password : 'tiger',
	connectString : 'localhost:1521/xe'},
	function(error, con){//연결이 완료되거나 에러가 발생하면 호출되는 콜백함수
		if(error){ //연결실패시
			console.log("db연결 실패");
		}else{//연결성공시
			conn = con;
			console.log("db연결 성공!");
		}
});
//express 객체 생성
var app = express();
var server = http.createServer(app);

//===================post방식 전송시 데이터 parser설정=====================
var bodyParser = require('body-parser');
app.use(express.static(__dirname)); //express에 기본 디렉토리 설정
app.use(bodyParser.urlencoded({extended:true})); //한글 인코딩 세팅
//====================================================================

//서버에 접속시 get방식으로 접속하면 get(), post방식으로 접속시 post()함수를 사용한다.
app.get('/home', function(request, response){
	fs.readFile(__dirname+"\\home.html", 'utf-8', function(error, data){
		if(error){
			response.writeHead(200, {"Content-type":"text/html; charset=utf-8"});
			response.end('파일읽기 에러발생');
		}else{
			response.writeHead(200, {"Content-type":"text/html; charset=utf-8"});
			response.end(data);
		}
	});
});
//이미지 처리
app.get('/images/*', function(req, res){
	var path = req.url; //    /images/Lighthouse.jpg
	var imgMime = mime.getType(path.substring(1));
	
	fs.readFile(".."+path, function(error, data){
		if(!error){
			res.writeHead(200, {"Contetnt-type":imgMime});
			res.end(data);
		}
	});
});
//게시판 목록
app.get('/list', function(req, res){
	//데이터 베이스 조회
	var sql = "select no, subject, userid, hit, to_char(writedate, 'MM-DD HH:MI') writedate from board order by no desc";
	
	//쿼리문 실행
	conn.execute(sql, function(error, result){
		if(error){
			//레코드 선택에러....
			res.writeHead(200, {'Content-type':'text/html; charset=utf-8'});
			res.end('<script>location.href="/home";</script>');
		}else{
			//레코드 선택시...
			console.log(result);
			
			fs.readFile('boardList.ejs', 'utf-8', function(error, data){
				if(error){
					res.writeHead(200, {'Content-type':'text/html; charset=utf-8'});
					res.end('<script>loactoin.href="/home";</script>');
				}else{
					// 총 레코드 수 구하기
					var totalRecord = result.rows.length;
					
					res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
					
					//ejs 페이지에서 사용할 데이터는 ejs페이지에 render하여 보낸다.
					//					(ejs소스코드, {보낼 데이터는 json으로})
					res.end(ejs.render(data, {
						results : result,
						totalrecord : totalRecord,
						parsing : {
							firstPage : 6,
							lastPage : 10,
							totalPage : 9,
							currentPage : 7
						}
					}));
				}
			});
		}
	});
	
	
//	fs.readFile(__dirname+"\\boardList.ejs", function(error, data){
//		if(!error){
//			res.writeHead(200, {"Content-type":"text/html; charset=utf-8"});
//			res.end(data);
//		}
//	});
});
//글쓰기 폼
app.get('/boardWrite', (req, res)=>{
	fs.readFile(__dirname+"\\boardWrite.html", function(e, d){
		if(!e){
			res.writeHead(200, {"Content-type":"text/html; charset=utf-8"});
			res.end(d);
		}
	});
});
//글쓰기 완료
app.post('/writeOk', function(req, res){
	//클라이언트 폼의 데이터를 서버로 request
	var userid = req.param('userid');
	var subject = req.param('subject');
	var content = req.param('content');
	
	//접속자의 ip를 구한다.
	var ip = requestip.getClientIp(req).substring(7); //   ::ffff:127.0.0.1로 구해진다.
	console.log('writeOk data ====> userid=%s, subject=%s, content=%s, ip', userid, subject, content, ip);

	var sql = 'insert into board(no, userid, subject, content, ip, hit, writedate) ' +
				"values(boardsq.nextval, '"+userid+"', '"+subject+"', '"+content+"', '"+ip+"', 0, sysdate)";
	console.log('writeOk sql => ', sql);
	//데이터 베이스에 글등록
	//			(실행할 쿼리문, 콜백함수)
	conn.execute(sql, function(error, result){
		if(error){//등록 실패
			res.writeHead(200, {"Content-type":"text/html;charset=utf-8"});
			res.write("<script>");
			res.write("alert('글등록실패....');");
			res.write("history.back();");
			res.end("</script>");
		}else{//등록 성공
			res.writeHead(200, {'Content-type':'text/html;charset=utf-8'});
			res.write('<script>alert("글이 등록되었음"); location.href="/list";');
			res.end("</script>");
		}
	});
});
//글 내용 보기
app.get('/boardView', function(req, res){
	//1. 글번호 request
	var no = req.param('no');
	//2. 조회수 증가
	var sql = "update board set hit = hit+1 where no="+no;
	conn.execute(sql, function(error, result){
		if(error){
			console.log("조회수 증가 에러..");
		}else{
			console.log("조회수 증가 성공~");
		}
	});
	//3. 레코드 선택하여 ejs로 보내기
	//CLOB 데이터형 처럼 대용량 데이터인 경우 DBMS_LOB.SUBSTR()함수를 이용하여 레코드를 선택하여야 한다.
	var sql2 = "select no, userid, subject, DBNS_LOB.SUBSTR(content, DBMS_LOB.GETLENGTH(content)), hit, writedate from board where no="+no;
});
///=접속대기===================================================================
server.listen(15005, ()=>{
	console.log("server start~~~~~ http://127.0.0.1:15005/home");
});