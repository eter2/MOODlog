import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginMain from "../Components/LoginMain.js";
import LoginFindId from '../Components/LoginFindId.js';
import LoginFindPassword from '../Components/LoginFindPassword.js';
import LoginJoin from '../Components/LoginJoin.js';

function Loginbox({handleLoginSuccess}) {
  return(
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="flex sm:mx-auto sm:w-full">
          <div className="flex items-center mx-auto mt-10 text-center sm:text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            <p className='text-main-color'>MOOD</p>
            <p>log</p>
          </div>
        </div>
        <Routes>
          <Route index element={<LoginMain handleLoginSuccess={handleLoginSuccess}/>} path="/"/>
          <Route path="/findId" element={<LoginFindId/>}/>
          <Route path="/findPassword" element={<LoginFindPassword/>}/>
          <Route path="/join" element={<LoginJoin/>}/>
        </Routes>
      </div>
    </>
  );
}

export default Loginbox;