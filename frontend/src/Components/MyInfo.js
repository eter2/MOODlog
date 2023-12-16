import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../Services/auth'

const MyInfo = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [checkPw, setcheckPw] = useState('')

  
  useEffect(() => {
    const fetchData = async () => {
        try {
            setId(localStorage.getItem('userId'));
        } catch (error) {
            console.error('Error fetching latest likes:', error);
        }
    };

    fetchData();
  }, []);  

  const navigate = useNavigate();

  const sendData = async () => {
    await auth.changeAdminPW(password);
    alert("비밀번호가 변경되었습니다! 재로그인해주세요");

    await auth.logout();
    localStorage.removeItem('login');
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    navigate('/login');
  }
  
  return(
    <div className="container mx-auto pt-4 px-5 flex flex-wrap flex-col sm:flex-row">
      <div className="w-full mx-auto">          
            <div className="w-full items-center mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="id">아이디</label>            
                <input
                id='id'
                type='text'
                required
                className="block rounded-md px-1.5 py-1.5 bg-gray-100 text-gray-900 ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 pointer-events-none"
                value={id}
                readOnly
                />
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
                        name="password"
                        type='password'
                        required
                        className="block rounded-md px-1.5 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-main-color sm:text-sm sm:leading-6"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        비밀번호 확인
                    </label>
                    </div>
                    <div className="mt-2">                                  
                    <input
                        id="checkPw"
                        name="checkPw"
                        type='password'
                        required
                        className="block rounded-md px-1.5 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-main-color sm:text-sm sm:leading-6"
                        onChange={(e) => setcheckPw(e.target.value)}
                        value={checkPw}
                    />
                    </div>
                    {
                        checkPw !== '' ? (
                            password === checkPw ? 
                            <div className="text-blue-500 text-xs italic mt-2">비밀번호가 일치합니다.</div>
                            : 
                            <div className="text-red-500 text-xs italic mt-2">비밀번호가 일치하지 않습니다.</div>
                        ) : (<></>)
                    }
                </div>
            </div>
        <div className="flex justify-between mt-2"> 
            <button className="h-12 w-[150px] bg-main-color text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-gray-400"
            onClick={sendData}>
                작성완료
            </button>
        </div>   
    </div>
  );
}

export default MyInfo;
