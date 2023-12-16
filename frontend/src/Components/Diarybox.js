import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import postService from '../Services/post'
import commentService from '../Services/comment.js'

const Diarybox = ({id, title, date, content, imgUrl}) => {
    const [likes, setLikes] = useState(0);
    const [commentnum, setCommentnum] = useState(0);
    
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const data = await postService.getPostLikesNum(id);
                setLikes(data.count);
            } catch (error) {
                console.error('Error fetching latest likes:', error);
            }
        };

        fetchLikes();

        const fetchComments = async () => {
            try {
                const data = await commentService.getCommentsByPost(id);
                setCommentnum(data.length)
            } catch (error) {
                console.error('Error fetching latest comments:', error);
            }
        };

        fetchComments();
    }, []);

    const removeTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || '';
    }

    const imagePath = imgUrl ? imgUrl : null;


    const navigate = useNavigate();

    const handleOpening = () => {
        navigate(`/view/${id}`);
    }

    const summarizedContent = () => {
        let summarizeContent = removeTags(content);
        summarizeContent = summarizeContent.length > 200 ? summarizeContent.substring(0, 200) + "..." : summarizeContent;
        return summarizeContent;
    };
    
    const today = new Date(date);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}년 ${month}월 ${day}일`;

    return(
        <div>
            <div className="w-full mx-auto mt-4">
                <div onClick={handleOpening} className="flex cursor-pointer">
                    <div className='w-4/5'>
                        <div className="flex items-center mb-3">
                            <div>
                                <div className="font-semibold text-gray-800">{title}</div>
                            </div>
                        </div>
                        <div className="text-sm leading-relaxed mb-2">{summarizedContent()}</div>
                        <div>
                            <div className="text-sm text-gray-500">{formattedDate} · {commentnum}개의 댓글 · <FontAwesomeIcon icon={faHeart} /> {likes}</div>
                        </div>
                    </div>
                    <div className='flex w-1/5'>
                        <div className='relative w-full'>
                            <div className='relative overflow-hidden' style={{ paddingBottom: '100%' }}>
                                {imagePath ? (
                                    <img
                                        src={imagePath}
                                        alt="사진"
                                        className='absolute inset-0 w-full h-full object-cover'
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                </div>                    
                <hr className="mt-2" width="100%" />
            </div>
        </div>
    );
}

export default Diarybox;
