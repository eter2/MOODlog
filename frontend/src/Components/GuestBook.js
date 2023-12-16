import React from 'react';
import { useNavigate } from 'react-router-dom';
import guestbookService from '../Services/guestbook.js'

const GuestBook = ({id, authorId, userName, imgUrl, guestMsg, writeDate}) => {
    const today = new Date(writeDate);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}년 ${month}월 ${day}일`;

    const deleteComment = async () => {
        await guestbookService.deleteGuestComment(id);
        // window.location.reload();
    }

    const navigate = useNavigate();
    const handleOpening = () => {
        localStorage.setItem('id', authorId);
        const id = localStorage.getItem('id');
        navigate(`/${id}`);
    }

    return(
        <div className="w-full mx-auto px-2 py-2 mt-3">
            <div className="flex items-center mb-6">
                <img src={imgUrl} alt="Profile" className="w-12 h-12 rounded-full mr-4 cursor-pointer" onClick={handleOpening}/>
                <div className='w-full'>
                    <div className='flex justify-between'>
                        <div className="font-semibold text-gray-800 cursor-pointer" onClick={handleOpening}>{userName}</div>
                        <div  className={`text-sm cursor-pointer ${authorId !== localStorage.getItem('userId') ? 'hidden' : ''}`} onClick={deleteComment}>삭제</div>
                    </div>
                    <div className="text-sm text-gray-500">{formattedDate}</div>
                </div>
            </div>
            <p className="text-sm leading-relaxed mb-6">{guestMsg}</p>
            <hr className="mt-2" width="100%" />
        </div>
    );
    // <div className="w-full mx-auto px-2 py-2 mt-3">
    //     <div className="flex items-center mb-6">
    //         <img src={imgUrl} alt="Profile" className="w-12 h-12 rounded-full mr-4" />
    //         <div>
    //             <div className="font-semibold text-gray-800">{userName}</div>
    //             <div className="text-sm text-gray-500">{formattedDate}</div>
    //         </div>
    //     </div>
    //     <p className="text-sm leading-relaxed mb-6">{guestMsg}</p>
    //     <hr className="mt-2" width="100%" />
    // </div>
    // );
}

export default GuestBook;