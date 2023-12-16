import React, { useState, useEffect } from 'react';
import Statistic from './Statistic.js';
import Diarybox from './Diarybox.js';
import Calendar from './Calendar.js'
import './profile.css';
import postService from '../Services/post'
import profileService from '../Services/profile.js'
import emotionService from '../Services/emotion.js'
import weatherService from '../Services/weather.js'
import friendService from '../Services/friend.js'

function Profile(){
  const [latestPosts, setLatestPosts] = useState([]);
  const [userName, setUserName] = useState("");
  const [todayQuote, setTodayQuote] = useState("");  
  const [numFeed, setNumFeed] = useState(0);
  const [joinDate, setJoinDate] = useState("");
  const [friendNum, setFriendNum] = useState(0);
  const [mooddata, setMooddata] = useState([]);
  const [weatherdata, setWeatherdata] = useState([]);
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    const fetchLatestPostList = async () => {
      try {
        const id = localStorage.getItem('id');
        const posts = await postService.getLatestPostsByUser(id);
        setLatestPosts(posts);
      } catch (error) {
        console.error('Error fetching latest posts:', error);
      }
    };

    const fetchFriend = async () => {
        try {
          const id = localStorage.getItem('id');
          const data = await friendService.getFriendList(id);
          setFriendNum(data[0].friendId.length);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }

    fetchFriend();

    fetchLatestPostList();

    const fetchPostList = async () => {
      try {
        const id = localStorage.getItem('id');
        const posts = await postService.getPostsByUser(id);
        setNumFeed(posts.length);
      } catch (error) {
        console.error('Error fetching latest posts:', error);
      }
    };

    fetchPostList();

    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem('id');
        const data = await profileService.getProfileByUserId(userId);
        if (data.length > 0) {
          const profileData = data[0];
          setJoinDate(profileData.createdAt);
          setTodayQuote(profileData.about);
          setUserName(profileData.username);
          setImgUrl(profileData.image !== ""? profileData.image: `${process.env.PUBLIC_URL}/profile.jpg`);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

    fetchProfile();

    const fetchEmotion = async () => {
      try {
        const data = await emotionService.getPostEmotion();
        if (data.length > 0) {
          const formattedData = data.map(item => {
            return {
              label: item.emotion,
              value: item.count,
              color: item.color
            };
          });
          setMooddata(formattedData);
        }
      } catch (error) {
          console.error('Error fetching latest likes:', error);
      }
    }

    fetchEmotion();

    const fetchWeather = async () => {
      try {
        const data = await weatherService.getPostWeather();
        if (data.length > 0) {
          const formattedData = data.map(item => {
            return {
              label: item.weather,
              value: item.count,
              color: item.color
            };
          });
          setWeatherdata(formattedData);
        }
      } catch (error) {
          console.error('Error fetching latest likes:', error);
      }
    }

    fetchWeather();
  }, []);

  
  // const friendNum = 10; //fetch

  const profileDate = new Date(joinDate);
  const today = new Date();
  let joinTime = Math.abs(today - profileDate);
  joinTime = Math.ceil(joinTime / (1000 * 60 * 60 * 24));

  return(
      <div className="container mx-auto pt-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <div className="userinfo text-center sm:text-center flex items-center w-full">
              <div className="max-w-lg mx-auto bg-white rounded-lg p-5">
                  <div><img className="rounded-full mx-auto" style={{width: '150px', height: '150px'}} alt="내 정보" src={imgUrl} /></div>
                  <h3 className='text-center font-semibold mt-3'>{userName}</h3>                    
                  <div className="flex justify-center mt-5">
                      <div className="mr-4 p-3 text-center">
                      <span className="text-sm text-blueGray-400">친구</span><span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{friendNum}</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                      <span className="text-sm text-blueGray-400">작성글</span><span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{numFeed}</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                      <span className="text-sm text-blueGray-400">가입</span><span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">D+{joinTime}</span>
                      </div>
                  </div>
                  <div className="mt-5">
                  <p className="text-gray-600 mt-2">{todayQuote}</p>
                  </div>
              </div>
              <div className="text-gray-500 text-sm w-1/2">
                  <Calendar />
              </div>
          </div>
          <div className="chart text-center sm:text-center flex items-center w-full">
              <div className="mx-auto chart flex justify-center mt-5">
                  <div className="mr-4 p-3 text-center">
                  <Statistic title="날씨 통계" data={weatherdata}/>
                  </div>
                  <div className="mr-4 p-3 text-center">
                  <Statistic title="기분 통계" data={mooddata}/>
                  </div>
              </div>
          </div>

          <div className='mt-5 w-full'>
            <div className='mb-2'>
              <div className='mb-2'>최신글</div>
              <hr width="100%"/>
            </div>
              {latestPosts.length > 0 && (
                latestPosts.map((post, index) => (
                <Diarybox key={index} id={post._id} title={post.title} content={post.content} imgUrl={post.images} date={post.createdAt} />
                )
              ))}
          </div>
      </div>
  );
}

export default Profile;