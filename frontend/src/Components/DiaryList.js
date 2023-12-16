import React, { useState, useEffect } from 'react';
import Diarybox from "./Diarybox.js";
import postService from '../Services/post'
import Pagination from "./Pagination.js";

const DiaryList = () => {
    const [postList, setpostList] = useState([]);
    const [total, setTotal] = useState(1);
    const [page, setPage] = useState(1);
  
    useEffect(() => {
      const fetchPostList = async () => {
        try {
          const id = localStorage.getItem('id')
          const posts = await postService.getPostsByUser(id);
          setpostList(posts);
          setTotal(posts.length === 0 ? 1 : posts.length);
        } catch (error) {
          console.error('Error fetching latest posts:', error);
        }
      };
      fetchPostList();
    }, [page]);

    return(
        <div className="w-full container mx-auto px-5 flex flex-wrap flex-col sm:flex-row">
            <div className='w-full'>
                {postList.map((post, index) => (
                <Diarybox key={index} id={post._id} title={post.title} content={post.content} imgUrl={post.images} date={post.createdAt} />
                ))}
            </div>
            <Pagination total={total} page={page} setPage={setPage}/>
        </div>
    );
}

export default DiaryList;