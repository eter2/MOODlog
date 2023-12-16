import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Comment from './Comment.js'
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import postService from '../Services/post.js'
import commentService from '../Services/comment.js'
import likeService from '../Services/like.js'

const DiaryboxDetail = () => {
    const { _id } = useParams();
    const [likes, setLikes] = useState(false); // 현재 게시글에 대한 좋아요인지 아닌지
    const [likesnum, setLikesnum] = useState(0); // 좋아요 수
    const [post, setPost] = useState([]);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [commentnum, setCommentnum] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await postService.getDetailPostLikesNum(_id);
                setLikesnum(data.count);
            } catch (error) {
                console.error('Error fetching latest likes:', error);
            }
        };

        fetchData();

        const fetchLikes = async () => {
            try {
                const data = await likeService.fetchLikesByPost(_id);
                setLikes(data.liked);
            } catch (error) {
                console.error('Error fetching latest likes:', error);
            }
        };

        fetchLikes();

        const fetchPosts = async () => {
            try {
                const data = await postService.getPost(_id);
                setPost(data);
            } catch (error) {
                console.error('Error fetching latest posts:', error);
            }
        };

        fetchPosts();

        const fetchComments = async () => {
            try {
                const data = await commentService.getCommentsByPost(_id);
                setComments(data);
                setCommentnum(data.length)
            } catch (error) {
                console.error('Error fetching latest comments:', error);
            }
        };

        fetchComments();
    }, [_id]);

    const toggleFavorite = async () => {
        if(likes) {
            await likeService.removeLike(_id);
            window.location.reload();
        } 
        else {
            await likeService.addLike(_id);
            window.location.reload();
        }
    }

    const title = post.title;
    const content = post.content;
    const date = post.createdAt;
    const today = new Date(date);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}년 ${month}월 ${day}일`;

    const sendComment = async () => {
        try {
            await commentService.createComment(_id, comment);
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;
            window.scrollTo(scrollX, scrollY);
            setComment("");
            window.location.reload();
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    }

    return(
        <div className="container mx-auto px-5 flex flex-wrap flex-col sm:flex-row">
            <div className="w-full mx-auto mt-4">
                <div className="flex justify-between items-center mb-3">
                    <div className='flex'>
                        <div>
                            <div className="font-semibold text-gray-800 mb-2">{title}</div>
                            <div className="text-sm text-gray-500 mb-2">{formattedDate} · {commentnum}개의 댓글 · <FontAwesomeIcon icon={faHeart} /> {likesnum}</div>
                        </div>
                    </div>
                    <div className="text-sm leading-relaxed mb-2">
                        <IconButton onClick={toggleFavorite}>
                            {(likes === true) ? <Favorite /> : <FavoriteBorder /> } {likesnum}
                        </IconButton>
                    </div>
                </div>

                <div className="text-sm leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            
            <div className=''>
                <div className="text-sm text-gray-500 pt-4 mb-2">{commentnum}개의 댓글</div>
            </div>
            <div className="container mx-auto flex flex-wrap flex-col sm:flex-row">
                <div className="flex w-full justify-center items-center">
                        <div className="px-7 w-full bg-white p-4 border rounded-lg">
                            <textarea 
                            id="comment"
                            className="h-40 px-3 text-sm py-1 outline-none border-gray-300 w-full resize-none border rounded-lg placeholder:text-sm" placeholder="댓글을 작성해주세요."
                            onChange={(e) => setComment(e.target.value)}></textarea>  
                            <div className="flex justify-between mt-2"> 
                                <p></p>
                                <button className="h-12 w-[150px] bg-gray-400 text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-main-color"
                                onClick={sendComment}>
                                    작성완료
                                </button>
                            </div>   
                        </div>
                </div>
                {comments.map((comment, index) => (
                    <Comment
                    key={index}
                    id={comment._id}
                    userId={comment.user_id}
                    guestMsg={comment.content} // 댓글 내용
                    writeDate={comment.createdAt}
                    />
                ))}
            </div>
        </div>
    )
}

export default DiaryboxDetail;