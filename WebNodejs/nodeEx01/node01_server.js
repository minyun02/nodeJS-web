/**  == 준비사항 ==
 
    1. nodejs.org 에서 다운로드 후 설치
    2. 이클립스에서 help -> eclipse-marketplace -> node로 검색후 Enide.psf를 인스톨한다.
 
 */

// 1. http모듈  (== http.jsp 랑 같은 ?)--> http 모듈을 객체로 만든후 서버를 생성한다.
//         require()함수는 모듈을 객체로 생성하는 함수이다.

//      변수
    var http =  require('http'); // 객체를 만드는 방법
    
//2. 서버생성하기 http객체를 이용하여생성하기.
    // 변수에넣어서                            req   res(여기에 쓰기를하면 클라이언트가 본다
    var server =http.createServer(function( request, response){ // 접속이벤트가 발생되어야실행이된다.
      //1. 클라이언트 서버에 접속하면 실행할 실행문을 기술하는 곳이다.
       
      //2. 서버에서 클라이언트 데이터 또는 정보를 보내는 것은 response 객체를 이용한다.
          //1.header 셋팅한다.
       response.writeHead(200,{'Content-Type':'text/html;charset=UTF-8'}); //정상접속이되면
          //2.클라이언트에게 보낼페이지내용
       
       response.write('<h1>노드js 서버에서 보낸 정보</h1>');
       response.write('<ul><li>첫번쨰 데이터 </li>');
       response.write('<li>두번쨰 데이터 </li></ul>');
          //3. 마지막 전송 데이터 표시
       response.end('<h2>마지막으로 보낸 문자</h2>');
    });
    
//3. 접속대기 - 클라이언트가 서버에 접속을 하기를 기다린다.
    //   대기하는 메소드         현재서버의 접속포트를 넣는다. -> 포트수 .. 육만오천개....2의6승..
    server.listen(10001,function(){
       console.log("server is running   http://127.0.0.1:10001   " );
       console.log("server is running   http://localhost:10001   " );
    });