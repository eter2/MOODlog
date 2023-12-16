import React, { useState, useEffect } from 'react';
import GuestBook from './GuestBook.js'
import Pagination from "./Pagination.js";
import guestbookService from '../Services/guestbook.js'

const Guest = () => {
    const [guestbookList, setguestbookList] = useState([]);
    const [content, setContent] = useState("");
    const [total, setTotal] = useState(1);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchGuestBookList = async () => {
            try {
                const id = localStorage.getItem('id');
                const guestbooks = await guestbookService.getGuestComments(id);
                setguestbookList(guestbooks);
                setTotal(guestbooks.length === 0? 1: guestbooks.length);
            } catch (error) {
                console.error('Error fetching guestbook:', error);
            }
        };
    
        fetchGuestBookList();
    }, []); 

    const sendData = async () => {
        const blogId = localStorage.getItem('id');
        await guestbookService.addGuestComment(blogId, content);
    }

    return(
    <div className="container mx-auto pt-4 px-5 flex flex-wrap flex-col sm:flex-row">
       <div className="flex w-full justify-center items-center">
            <div className="px-7 w-full bg-white p-4 border rounded-lg">
                <textarea className="h-40 px-3 text-sm py-1 outline-none border-gray-300 w-full resize-none border rounded-lg placeholder:text-sm" placeholder="방명록을 작성해주세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}></textarea>  
                <div className="flex justify-between mt-2"> 
                    <p></p>
                    <button className="h-12 w-[150px] bg-gray-400 text-sm text-white rounded-lg transition-all cursor-pointer hover:bg-main-color"
                    onClick={sendData}>
                        작성완료
                    </button>
                </div>   
            </div>   
        </div>

        {guestbookList.map((guestbook,index) => (
                <GuestBook
                key={index}
                id={guestbook._id}
                authorId={guestbook.authorId}
                userName={guestbook.authorProfile.username} // 작성자 이름
                imgUrl={guestbook.authorProfile.image} // 작성자 프로필 이미지
                guestMsg={guestbook.comment} // 댓글 내용
                writeDate={guestbook.createdAt} // 작성 날짜
            />
        ))}
        <Pagination total={total} page={page} setPage={setPage}/>
    </div>
    );
}

export default Guest;