//정규식 체크

// import moment from "moment";

//이메일
export const emailCheck = (email) => {

  let _reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return _reg.test(email);

}

//닉네임은 한글,영문,숫자만가능하며 2~6자리가능
export const nicknameCheck = (nickname) => {
  let _reg = /^[a-zA-Zㄱ-힣0-9]{2,6}$/;
  return _reg.test(nickname)

}


//비밀번호 영어숫자특수기호
export const pwMatch = (pw) => {
  //const _reg = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{4,20}$/;
  const _reg = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{4,20}$/;
  return _reg.test(pw) && pw.search(/\s/) === -1 ? true : false;

}

//비밀번호 연속3자리
export const pwContinuous = (pw) => {

  const _reg = /(\w)\1\1/;
  return _reg.test(pw)
}

//url http(s) 확인
export const urlCheck = (url) => {
  const _reg = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi;
  return _reg.test(url)
}

// // 시간 변경
// export const ChangeTimeType = (time) => {
//   const changedTime = moment(time).format('YYYY.MM.DD HH:mm')
// return changedTime
// }

// export function calcTime(time){
//     //만약 말일의경우 하루 차이임에도 불구하고 1달전 1년전으로 표기됨

//     let currentDate = moment()
//     let createdDate = moment(time)
//     const diffHour = parseInt(moment.duration(currentDate.diff(createdDate)).asHours())
//     const diffDay = parseInt(moment.duration(currentDate.diff(createdDate)).asDays())
//     if (diffDay<1){
//       return diffHour +'시간 전'
//     }
//     return diffDay + '일 전'
  
// }


//핸드폰번호 하이픈,점,공백 제거
export const specialCharsCheck = (userNumber) => {
  return userNumber.replace(/[.-]|\s/gm,'');
}

//핸드폰번호 자릿수정규식체크
export const cellPhoneNum = (userNumber) => {
  const _reg = /^\d{3}\d{3,4}\d{4}$/;
  return _reg.test(userNumber)
}

//인증번호 숫자6자리
export const certNumberCheck = (certNumber) => {
  const _reg = /^\d{6}$/;
  return _reg.test(certNumber)
}