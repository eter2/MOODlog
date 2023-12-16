import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from "../Components/Header.js";
import Profile from "../Components/profile.js";
import Editor from "../Components/Editor.js";
import DiaryboxDetail from "../Components/DiaryboxDetail.js";
import DiaryList from "../Components/DiaryList.js";
import HeaderProfile from '../Components/HeaderProfile.js';
import Guest from "../Components/Guest.js"
import profileService from '../Services/profile.js'

function Home() {
    const [Blogname, setBlogname] = useState("");
    const [userName, setUserName] = useState("");
    const [imagePath, setImagePath] = useState("");

    const id = localStorage.getItem('id');

    useEffect(() => {    
        const fetchProfile = async () => {
            try {
                const data = await profileService.getProfileByUserId(id);
                
                if (window.location.pathname === '/') {
                    navigate(`/${localStorage.getItem('userId')}`);
                }

                if (data.length > 0) {
                  const profileData = data[0];
                  setBlogname(profileData.blog_name);
                }

                const userData = await profileService.getProfileByUserId(localStorage.getItem('userId'));
                if (data.length > 0) {
                  const profileData = userData[0];
                  setUserName(profileData.username);
                  setImagePath(profileData.image !== ""? profileData.image: `${process.env.PUBLIC_URL}/profile.jpg`);
                }
            } catch (error) {
                console.error('Error fetching latest likes:', error);
            }
        }
    
        fetchProfile();
      }, []);

    const navigate = useNavigate();

    const gotoProfile = () => {
        localStorage.setItem("id", localStorage.getItem('userId'));
        const id = localStorage.getItem('id');
        navigate(`/${id}`);
        window.location.reload();
    }

    return(
        <div>
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
                <div className="text-2xl text-left sm:text-left hover:cursor-default">{Blogname}</div>
            </div>
            <Header menu1="프로필" menu2="글 목록" menu3="방명록" />
            <Routes>
                <Route index element={<Profile/>} path={`/${id}`}/>
                <Route path={`/${id}/diaryList`} element={<DiaryList/>}/>
                <Route path={`/editor`} element={<Editor/>}/>
                <Route path={`/${id}/visiting`} element={<Guest/>}/>
                <Route path="/view/:_id" element={<DiaryboxDetail />}/>
            </Routes>
            <br/><br/>

            <footer className="text-gray-700 body-font">
                <div className="bg-gray-200">
                <div className="container mx-auto pt-4 px-5 flex flex-wrap flex-col sm:flex-row">
                    <p className="text-gray-500 text-sm text-center sm:text-left">
                    Copyright© 2023 Web System Design Team5
                    </p>
                    <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">
                    박병하, 이정민, 이현영, 최현수
                    </span>
                </div>
                <div className="container mx-auto pb-4 px-5 flex flex-wrap flex-col sm:flex-row">
                </div>
                </div>
            </footer>
        </div>
    );
}

export default Home;