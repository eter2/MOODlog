import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route} from 'react-router-dom';
import HeaderProfile from '../Components/HeaderProfile.js';
import './Adminpage.css'
import Header from "../Components/Header.js";
import BlogInfo from "../Components/BlogInfo.js";
import FriendInfo from "../Components/FriendInfo.js";
import MyInfo from "../Components/MyInfo.js"
import profileService from '../Services/profile.js'

function AdminPage() {
  const [userName, setUserName] = useState("");
  const [imagePath, setImagePath] = useState("");
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem('id');
        const data = await profileService.getProfileByUserId(userId);
        if (data.length > 0) {
          const profileData = data[0];
          setUserName(profileData.username);
          setImagePath(profileData.image !== ""? profileData.image: `${process.env.PUBLIC_URL}/profile.jpg`);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

    fetchProfile();
  })

  const navigate = useNavigate();

  const gotoProfile = () => {
    localStorage.setItem("id", localStorage.getItem('userId'));
    const id = localStorage.getItem('id');
    navigate(`/${id}`);
    window.location.reload();
  }

  return (
    <>
      <header>
        <div className="container mx-auto pt-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <div className="text-left sm:text-left flex items-center w-full">
              <span className="font-bold text-left text-lg sm:text-left flex items-center w-full hover:cursor-pointer" onClick={gotoProfile}>
                <p className='text-main-color'>MOOD</p>
                <p>log</p>
              </span>
              <div className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-1/8 sm:text-center text-center text-gray-500 text-sm">
              <HeaderProfile imagePath={imagePath} userName={userName} />
              </div>
          </div>  
        </div>
      </header>
      <div className="container mx-auto mt-5 pt-4 px-5 flex flex-wrap flex-col sm:flex-row">
                <div className="text-2xl text-left sm:text-left hover:cursor-default">관리자 페이지</div>
      </div>
      <Header menu1="블로그 정보" menu2="친구 정보" menu3="내 정보" />
      <Routes>
        <Route index element={<BlogInfo/>} path="/"/>
        <Route path="/settingFriends" element={<FriendInfo/>}/>
        <Route path="/settingMe" element={<MyInfo />} />
      </Routes>
    </>
    );
  }
   
export default AdminPage;
   