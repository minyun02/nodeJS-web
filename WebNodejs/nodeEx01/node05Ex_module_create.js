/**
 * 1~?까지 짝수의 합은 = ?
 * 1~?까지 홀수의 합은 = ?
 * 1~?까지 총 합은 = ?
 */
//홀수 합
exports.oddSum = function(num){
	var tot = 0;
	for(i=1; i<=num; i+=2){
		tot += i;
	}
	return "1~"+num+"까지 홀수 합은 "+tot+"이다";
}
//짝수 합
exports.evenSum = function(num){
	var tot = 0;
	for(i=2; i<=num; i+=2){
		tot += i;
	}
	return "1~"+num+"까지 짝수 합은 "+tot+"이다";
}
//합
exports.sum = function(num){
	var tot = 0;
	for(i=1; i<=num; i++){
		tot += i;
	}
	return "1~"+num+"까지 합은 "+tot+"이다";
}
////짝수 합
//exports.evenSum = function(n1){
//	var even = 0;
//	for(var i=1; i<=n1; i++){
//		if((i%2)===0){
//			even += i;
//		}
//	}
//	return even;
//};
////홀수 합
//exports.oddSum = function(n2){
//	var odd = 0;
//	for(var i=1; i<=n2; i++){
//		if(!(i%2===0)){
//			odd += i;
//		}
//	}
//	return odd;
//};
//// 합
//exports.sumCal = function(n3){
//	var sum = 0;
//	for(var i=1; i<=n3; i++){
//		sum += i;
//	}
//	return sum;
//};
