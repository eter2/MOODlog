import React, { useState, useEffect } from 'react';
import postService from '../Services/post.js'
import profileService from '../Services/profile.js'

const BlogInfo = () => {
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [newImgUrl, setNewImgUrl] = useState("");
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
          const userId = localStorage.getItem('id');
          const data = await profileService.getProfileByUserId(userId);
          if (data.length > 0) {
            const profileData = data[0];
            setTitle(profileData.blog_name);
            setImgUrl(profileData.image !== ""? profileData.image: `${process.env.PUBLIC_URL}/profile.jpg`);
            setUserName(profileData.username);
            setDescription(profileData.about);
          }
      } catch (error) {
          console.error('Error fetching profile:', error);
      }
    }

    fetchProfile();
  }, []);  
  
  const imageHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    try {
      const imgUrl = await postService.uploadImage(file);
      setImgUrl(imgUrl);
      setNewImgUrl(imgUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const sendData = async () => {
    let tmpImgUrl = "";
    if(newImgUrl === "") {
      tmpImgUrl = imgUrl === `${process.env.PUBLIC_URL}/profile.jpg` ? "" : imgUrl;
    }

    try {
      if (tmpImgUrl == "") {
        await profileService.updateProfile(title, newImgUrl, userName, description);
      }
      else {        
        await profileService.updateProfile(title, tmpImgUrl, userName, description);
      }
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }
  
  return(
    <div className="container mx-auto pt-4 px-5 flex flex-wrap flex-col sm:flex-row">
      <div className="w-full mx-auto">          
          <div className="w-full items-center mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="title">블로그 이름</label>            
            <input
              id='title'
              name='title'
              type='text'
              required
              className="block w-[400px] rounded-md px-1.5 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-main-color sm:text-sm sm:leading-6"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          
          <div className="w-full items-center mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"  htmlFor="profile">프로필 사진</label>
            <img className="w-[150px] rounded-full" src={imgUrl} alt="프로필" />
            <input
              id="profile"
              type="file"
              accept="image/*"
              className="block text-sm px-0.5 py-0.5 rounded-md text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 mt-2"
              onChange={(e) => imageHandler(e)}
            />
          </div>

          <div className="w-full items-center mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="userName">이름</label>            
            <input
              id='userName'
              type='text'
              required
              className="block rounded-md px-1.5 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-main-color sm:text-sm sm:leading-6"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
          </div>

          <div className="w-full items-center mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="description">소개</label>            
            <textarea
              id='description'
              type='text'
              required
              className="textbox block rounded-md w-[400px] px-1.5 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-main-color sm:text-sm sm:leading-6"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
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

export default BlogInfo;