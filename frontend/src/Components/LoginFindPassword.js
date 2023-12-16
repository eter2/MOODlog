import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../Services/auth'

const LoginFindPassword = () => {
  const [inputEmail, setInputEmail] = useState('')
  const [inputPw, setInputPw] = useState('')
  const [checkPw, setcheckPw] = useState('')
  const [verifyCode, setverifyCode] = useState('')
  const [isVerified, setisVerified] = useState(null)
  const [tryVerifing, settryVerifing] = useState(false)
  const [timerVisible, setTimerVisible] = useState(false)
  const [timeLeft, setTimeLeft] = useState(180)
  const [disable, setDisable] = useState(false)

  const handleInputEmail = (e) => {
    setInputEmail(e.target.value)
  }

  const handleverifyCode = (e) => {
    setverifyCode(e.target.value)
  }

  const handleInputPw = (e) => {
    if(e.target.value.length > 20)
      alert("비밀번호 최대 길이는 20자입니다.")
    else setInputPw(e.target.value)
  }

  const handlecheckPw = (e) => {
    setcheckPw(e.target.value)
  }

  const toggleFinding = async () => {      
    if(inputEmail !== ""){
      setisVerified(null)
      setTimerVisible(true)
      setTimeLeft(180)
    }
    else { alert("이메일을 입력해주세요")
      return;
    }

    const matching = await auth.checkEmail(inputEmail);
    if(!matching) {
      settryVerifing(true);
      setDisable(true);
      await auth.sendEmail(inputEmail);
    }
    else
      alert("등록되지 않은 이메일입니다 다시 한번 확인해주세요")
  }

  const checkingVerifing = async () => {
    if(timerVisible){
      const response = await auth.verify(inputEmail, verifyCode);
      setisVerified(response);
    }
    else setisVerified(false)
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
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isVerified, timerVisible]);

  const navigate = useNavigate();

  const changePassword = async () => {
    if(inputPw!==checkPw)
      alert("비밀번호가 일치하지 않습니다");
    else if(inputPw === "")
      alert("비밀번호를 입력해주세요");
    else if(inputPw.length < 6)
      alert("6자 이상의 비밀번호를 입력해주세요")
    else{
      await auth.changePW(inputEmail, inputPw);
      alert("비밀번호가 변경되었습니다! 재로그인해주세요");
      navigate("/login");
    }
  }


  return(
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email
            </label>
            <div className="mt-2">
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
          </div>
        </div>
      </form>
      <div className="mt-2 flex gap-x-2">
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-main-color px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={toggleFinding}
            >
              인증하기
            </button>
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
          <div>
              {(isVerified ? (
              <div>
                  <div><br/>
                  <div>비밀번호 변경</div>
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
                  <button
                      type="button"
                      onClick={changePassword}
                      className="flex w-full justify-center rounded-md bg-main-color px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
                  >
                      비밀번호 변경
                  </button>
                  </div>
              </div>
              ):(
                  <></>
              ))}
          </div>
        </div>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a href="/login" className="text-sm font-semibold text-gray-900 hover:text-main-color">
          로그인 화면으로 돌아가기
        </a>
      </div>
    </div>
  );
}

export default LoginFindPassword;