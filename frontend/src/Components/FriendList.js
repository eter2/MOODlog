import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import friendService from '../Services/friend.js'
import profileService from '../Services/profile.js'

const FriendList = ({data, option}) => {
    const [status, setStatus] = useState("");
    const [userName, setUserName] = useState("");
    const [blogName, setBlogName] = useState("");
    const [imgUrl, setImgUrl] = useState("");

    useEffect(() => {

        if (option === "search") {
            setStatus("신청");
        
            setUserName(data.username);
            setBlogName(data.blog_name);
            setImgUrl(data.image !== ""? data.image: `${process.env.PUBLIC_URL}/profile.jpg`);
        }
        else if (option === "get") {
            setStatus("수락");

            const fetchProfile = async () => {
              try {
                const profileData = await profileService.getProfileByUserId(data.senderId);
                setUserName(profileData[0].username);
                setBlogName(profileData[0].blog_name);
                setImgUrl(profileData[0].image !== ""? profileData[0].image: `${process.env.PUBLIC_URL}/profile.jpg`);
              } catch (error) {
                console.error('Error fetching profile:', error);
              }
            }
        
            fetchProfile();
        }
        else if (option === "send") {
            setStatus("취소");         

            const fetchProfile = async () => {
              try {
                const profileData = await profileService.getProfileByUserId(data.receiverId);
                setUserName(profileData[0].username);
                setBlogName(profileData[0].blog_name);
                setImgUrl(profileData[0].image !== ""? profileData[0].image: `${process.env.PUBLIC_URL}/profile.jpg`);
              } catch (error) {
                console.error('Error fetching profile:', error);
              }
            }
        
            fetchProfile();
        }
        else if (option === "list") {
            setStatus("삭제");
            
            const fetchProfile = async () => {
              try {
                const profileData = await profileService.getProfileByUserId(data);
                setUserName(profileData[0].username);
                setBlogName(profileData[0].blog_name);
                setImgUrl(profileData[0].image !== ""? profileData[0].image: `${process.env.PUBLIC_URL}/profile.jpg`);
              } catch (error) {
                console.error('Error fetching profile:', error);
              }
            }
        
            fetchProfile();
        }
    }, []);

    const handleData = async() => {
        if (option === "search") {
            await friendService.sendFriendRequest(data.id);
            window.location.reload();
        }
        else if (option === "get") {
            await friendService.acceptFriendRequest(data.senderId);
            window.location.reload();
        }
        else if (option === "send") {
            await friendService.cancelFriendRequest(data.receiverId);
            window.location.reload();
        }
        else if (option === "list") {
            await friendService.removeFriend(data);
            window.location.reload();
        }
    }
    const rejectData = async() => {
        await friendService.rejectFriendRequest(data.senderId);
        window.location.reload();
    }

    const navigate = useNavigate();
    const handleOpening = () => {
        if (option === "search") {
            localStorage.setItem('id', data.id);
            const id = localStorage.getItem('id');
            navigate(`/${id}`);
        }
        else if (option === "get") {
            localStorage.setItem('id', data.senderId);
            const id = localStorage.getItem('id');
            navigate(`/${id}`);
        }
        else if (option === "list") {
            localStorage.setItem('id', data);
            const id = localStorage.getItem('id');
            navigate(`/${id}`);
        }
    }

    return (
        <div className="p-3 flex items-center justify-between hover:bg-gray-100">
            <div className="flex items-center cursor-pointer" onClick={handleOpening}>
                <img className="rounded-full h-10 w-10" src={imgUrl} alt="profile"/>
                <div className="ml-2 flex flex-col" >
                    <div className="leading-snug text-sm text-gray-900 font-bold" >{userName}</div>
                    <div className="text-sm text-gray-600">{blogName}</div>
                </div>
            </div>
            <div className='flex gap-2'>
                { status !== "" && (
                    <button className="h-8 px-3 text-md font-bold text-main-color border border-main-color rounded-full hover:bg-sub-color"
                    onClick={handleData}>{status}
                </button>
                )}
                { option === "get" && (
                    <button className="h-8 px-3 text-md font-bold text-main-color border border-main-color rounded-full hover:bg-sub-color"
                    onClick={rejectData}>거절
                    </button>
                )}
            </div>
        </div>
    );
}

export default FriendList;