import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../Services/auth'

const HeaderProfile = ({imagePath , userName}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const closeDropdown = (event) => {
        if (isDropdownOpen) {
            const dropdown = document.getElementById('userDropdown');
            if (dropdown && !dropdown.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', closeDropdown);
        if (isDropdownOpen) {
            window.addEventListener('click', closeDropdown);
        } else {
            window.removeEventListener('click', closeDropdown);
        }
        return () => {
            window.removeEventListener('click', closeDropdown);
            window.removeEventListener('scroll', closeDropdown);
        };
    }, [isDropdownOpen]);

    const handleImageClick = (event) => {
        event.stopPropagation();
        toggleDropdown();
    };
    
    const navigate = useNavigate();

    const logout = async () => {
        // await auth.logout();
        localStorage.removeItem('login');
        localStorage.removeItem('userId');
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleEditor = async() => {
        localStorage.setItem('id', localStorage.getItem('userId'));
        navigate('/editor');
    }

    const handleAdmin = async() => {
        localStorage.setItem('id', localStorage.getItem('userId'));
        navigate('/admin');
    }

    return (
        <div className="relative">
          <img
            id="avatarButton"
            type="button"
            data-dropdown-toggle="userDropdown"
            data-dropdown-placement="bottom-start"
            className="w-10 h-10 rounded-full cursor-pointer"
            src={imagePath}
            alt="User dropdown"
            onClick={handleImageClick}
          />

            {isDropdownOpen && (
            <div
                id="userDropdown"
                className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 right-2"
            >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>{userName}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                <li>
                    <a href="" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleEditor}>
                    글 작성하기
                    </a>
                    <a href="" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleAdmin}>
                    관리자 페이지
                    </a>
                </li>
                </ul>
                <div className="py-1">
                <a
                    href="/" onClick={logout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                    로그아웃
                </a>
                </div>
            </div>
            )}
        </div>
    );
};

export default HeaderProfile;