import React from "react";
import { useNavigate } from 'react-router-dom';

const MenuItem = ({ label, onClick }) => (
  <div className="hover:cursor-pointer" onClick={onClick}>
    {label}
  </div>
);

const Header = ({menu1, menu2, menu3}) => {

  const navigate = useNavigate();
  const userId = localStorage.getItem('id');
  const handleMenuClick = (menu) => {
    if(menu === "프로필") navigate(`/${userId}`);
    else if(menu === "글 목록") navigate(`/${userId}/diaryList`);
    else if(menu === "방명록") navigate(`/${userId}/visiting`);
    else if(menu === "블로그 정보") navigate("/admin/")
    else if(menu === "친구 정보") navigate("/admin/settingFriends")
    else if(menu === "내 정보") navigate("/admin/settingMe")
  };

  return (
    <div className="container mx-auto pt-4 px-5 flex flex-wrap flex-col sm:flex-row">
      <div className="mt-5 flex items-center justify-left gap-x-6">
        <MenuItem label={menu1} onClick={() => handleMenuClick(menu1)}>
          {menu1}
        </MenuItem>
        <MenuItem label={menu2} onClick={() => handleMenuClick(menu2)}>
          {menu2}
        </MenuItem>
        <MenuItem label={menu3} onClick={() => handleMenuClick(menu3)}>
          {menu3}
        </MenuItem>
      </div>
      <hr className="mt-2" width="100%" />
    </div>
  );
};

export default Header;