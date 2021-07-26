/**
 * 파일쓰기 : fs모듈을 이용한다.
 */
var fs = require('fs');
//1. 저장할 데이터
var txt = "짤봇 베타 에 Phoenix LiveView 와 Svelte \r\n를 함께 쓰는 형태로 개발하고 있는데 개발 만족도가 높다. \r\n" +
		"아무래도 사용한지 얼마 안되다보니 빌드 세팅과 같은 소소한\r\n 이슈가 있어서 폰트 등이 로드가 안되고 있는데, \r\n" +
		"/beta 를 때면 간단히 해결되는 거라 신경은 별로 안쓴다.\r\n Socket 으로 가볍게 메시지를 주고 받는 점도 만족스럽고, \r\n" +
		"좀 더 사용하다보면 나름의 문제가 생길 것 같긴 하지만 아직까지는 괜찮다. \r\n" +
		"단점이라면 역시 Phoenix, Svelte 둘 다 생태계가\r\n 아직은 부족하고, 해결해야할 문제가 여러모로 산재하고 있다.\r\n";

//1. 비동기식으로 파일 쓰기 : 스레드 구현
//fs.writeFile(파일명, 쓰기할 내용, 인코딩, 콜백함수);			
fs.writeFile(__dirname+"\\filewrite_async.txt", txt, 'utf-8', function(error){
	if(error){//에러메세지가 있으면 true
		//쓰기 실패시
		console.log("비동기식으로 쓰기 실패....");
	}else{//null이면 false
		//쓰기 성공
		console.log("비동기식으로 쓰기 완료!!!!!!!!!!!");
	}
});

//2. 동기식으로 파일 쓰기 : 명령어를 바로 실행
//						콜백함수가 없어서 예외처리를 한다.
//	writeFileSync(파일명, 내용, 인코딩)
try{
	fs.writeFileSync(__dirname+"\\filewriteSync.txt", txt, 'utf-8');
	console.log("동기식 파일 쓰기 완료!!!!!!!");
}catch(e){
	console.log("동기식으로 파일 쓰기 실패ㅡㅜㅜㅜㅜㅜㅜㅜ");
}
