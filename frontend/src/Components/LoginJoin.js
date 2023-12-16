import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../Services/auth'

const LoginJoin = () => {
  const [inputEmail, setInputEmail] = useState('')
  const [inputId, setInputId] = useState('')
  const [inputPw, setInputPw] = useState('')
  const [checkPw, setcheckPw] = useState('')
  const [inputNickname, setinputNickname] = useState('')
  const [verifyCode, setverifyCode] = useState('')
  const [isEmailDuplicate, setisEmailDuplicate] = useState(null)
  const [isIdDuplicate, setisIdDuplicate] = useState(null)
  const [isVerified, setisVerified] = useState(null)
  const [tryVerifing, settryVerifing] = useState(false)
  const [timerVisible, setTimerVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState(180)
  const [disable, setDisable] = useState(false)
  
  const handleInputEmail = (e) => {
    setInputEmail(e.target.value)
  } 

  const handleInputId = (e) => {
    if(e.target.value.length > 20)
        alert("아이디 최대 길이는 20자입니다.")
  else setInputId(e.target.value)
  }

  const handleInputPw = (e) => {
    if(e.target.value.length > 20)
      alert("비밀번호 최대 길이는 20자입니다.")
    else setInputPw(e.target.value)
  }

  const handleverifyCode = (e) => {
    setverifyCode(e.target.value)
  }

  const handlecheckPw = (e) => {
    setcheckPw(e.target.value)
  }

  const handlecheckNickname = (e) => {
      setinputNickname(e.target.value)
  }
  
  const checkingEmailDuplicate = async () => {
    if(inputEmail === ""){
      alert("이메일을 입력해주세요")
      return;
    }

    const response = await auth.checkEmail(inputEmail);
    setisEmailDuplicate(!response);
  }

  const checkingIdDuplicate = async () => {
    if(inputId === ""){
      alert("아이디를 입력해주세요")
      return;
    }
    else if(inputId.length < 5){
      alert("5자 이상의 아이디를 입력해주세요")
      return;
    }

    const response = await auth.checkId(inputId);
    setisIdDuplicate(!response);
  }

  const checkingVerifing = async () => {
    if(timerVisible){
      const response = await auth.verify(inputEmail, verifyCode);
      setisVerified(response);
    }
    else setisVerified(false)
  }

  const toggleVerifing = async () => {
    setDisable(true);
    setisVerified(null);
    setTimerVisible(true);
    setTimeLeft(180);
    if(isEmailDuplicate === false){
      await auth.sendEmail(inputEmail);
      settryVerifing(true);
    }
    else{
      alert("이메일 중복 확인 후 시도해주세요.");
    }
  }


  useEffect(() => {
    let timer;
    
    if(isVerified) setTimerVisible(false);
    if (timerVisible) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timer);
            setTimerVisible(false);
            // 타이머가 종료될 때 추가적인 동작을 수행할 수 있습니다.
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [isVerified, timerVisible]);

  const navigate = useNavigate();

  // 회원번호 이벤트
  const joinWeb = async () => {
    if(!isVerified){
      alert("인증 완료 후 시도해주세요")
    }
    else if(inputPw!==checkPw)
      alert("비밀번호가 일치하지 않습니다")

    else if(inputId === "")
      alert("아이디를 입력해주세요")

    else if(isIdDuplicate!==false)
      alert("아이디 중복 체크 후 시도해주세요")

    else if(inputPw === "")
      alert("비밀번호를 입력해주세요");

    else if(inputPw.length < 6)
      alert("6자 이상의 비밀번호를 입력해주세요")

    else if(inputNickname === "")
      alert("닉네임을 입력해주세요")

    else{
      await auth.register(inputNickname, inputEmail, inputId, inputPw);
      alert("회원가입 완료!");
      navigate("/login");
    }
  }

  return(
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <div>
          <label htmlFor="email" className="block text-sm font-medium w-2/3 leading-6 text-gray-900">
            Email
          </label>
          <div className="mt-2 flex">
            <input
              id="email"
              name="input_Email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-color
                sm:text-sm sm:leading-6"
              placeholder="이메일"
              value={inputEmail}
              onChange={handleInputEmail}
              disabled={disable}
            />
          </div>                
          {isEmailDuplicate !== null ? (
              isEmailDuplicate ? (
                <div className="text-red-500 text-xs italic mt-2">이미 사용 중인 이메일입니다.</div>
              ) : (
                <div className="text-blue-500 text-xs italic mt-2">사용 가능한 이메일입니다.</div>
              )
            ) : (<></>)}        
          <div className="mt-2 flex gap-x-2">
            <button
              type="button"
              className="flex w-1/2 justify-center rounded-md bg-main-color px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={checkingEmailDuplicate}
              disabled={disable}
            >
              중복확인
            </button>
            <button
              type="button"
              className="flex w-1/2 justify-center rounded-md bg-main-color px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={toggleVerifing}
            >
              인증하기
            </button>
          </div>
        </div>
        <div>
          <div>
            {tryVerifing ? (
              <>
              <div className="mt-2 flex gap-x-2">
                <input
                type="string"
                required
                className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-color
                sm:text-sm sm:leading-6"
                placeholder="인증번호"
                value={verifyCode}
                onChange={handleverifyCode}
                />
                <button
                  type="button"
                  className="flex w-1/4 justify-center rounded-md bg-main-color px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={checkingVerifing}
                >
                  인증
                </button>
              </div>
              {(isVerified !== null || isVerified===true) ? (
                isVerified ? (
                  <div className="text-blue-500 text-xs italic mt-2">인증 완료!</div>
                ) : (
                  <div className="text-red-500 text-xs italic mt-2">인증 실패</div>
                )
              ) : (
                <></>
              )}
              <div>
              {timerVisible && (
                <div className="mt-2 flex gap-x-2 text-xs">
                  <div>제한된 시간 내 입력해주세요</div>
                  <div style={{color:'red', fontSize:'16px'}}>{String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}</div>
                </div>
              )}
              </div>
              </>
            ):(
              <></>
            )
            }
          </div>
        </div>
        <div>
          <label htmlFor="id" className="block text-sm font-medium w-2/3 leading-6 text-gray-900">
            아이디
          </label>
          <div className="mt-2 flex">
            <input
              id="id"
              name="input_id"
              type="id"
              autoComplete="id"
              required
              className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-color
                sm:text-sm sm:leading-6"
              placeholder="아이디"
              value={inputId}
              onChange={handleInputId}
            />
          </div>
          <div className="mt-2 flex gap-x-2">
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-main-color px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={checkingIdDuplicate}
            >
              중복확인
            </button>
          </div>
          {isIdDuplicate !== null ? (
              isIdDuplicate ? (
                <div className="text-red-500 text-xs italic mt-2">이미 사용 중인 아이디입니다.</div>
              ) : (
                <div className="text-blue-500 text-xs italic mt-2">사용 가능한 아이디입니다.</div>
              )
            ) : (<></>)}        
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              비밀번호
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="input_pw"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-color sm:text-sm sm:leading-6"
              placeholder="비밀번호" 
              value={inputPw}
              onChange={handleInputPw}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <label htmlFor="password_chk" className="block text-sm font-medium leading-6 text-gray-900">
              비밀번호 확인
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password_chk"
              name="input_pw"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-color sm:text-sm sm:leading-6"
              placeholder="비밀번호 확인" 
              value={checkPw}
              onChange={handlecheckPw}
            />
          </div>
          {
            checkPw !== '' ? (
              inputPw === checkPw ? 
              <div className="text-blue-500 text-xs italic mt-2">비밀번호가 일치합니다.</div>
              : 
              <div className="text-red-500 text-xs italic mt-2">비밀번호가 일치하지 않습니다.</div>
            ) : (<></>)
          }
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="nickname" className="block text-sm font-medium leading-6 text-gray-900">
              닉네임
            </label>
          </div>
          <div className="mt-2">
            <input
              id="nickname"
              name="input_nickname"
              type="nickname"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-main-color sm:text-sm sm:leading-6"
              placeholder="닉네임" 
              value={inputNickname}
              onChange={handlecheckNickname}
            />
          </div>
        </div>
        <div>
          <button
            type="button"
            onClick={joinWeb}
            className="flex w-full justify-center rounded-md bg-main-color px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            회원가입
          </button>
        </div>
      </form>

      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a href="/login" className="text-sm font-semibold text-gray-900 hover:text-main-color">
          로그인 화면으로 돌아가기
        </a>
      </div>
    </div>
  );
}

export default LoginJoin;