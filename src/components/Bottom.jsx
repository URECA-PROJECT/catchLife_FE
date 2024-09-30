import React from "react";

import { Link } from "react-router-dom";
import { GoPerson } from "react-icons/go";
import { RiHome2Line } from "react-icons/ri";
import { useLogin } from "../context/LoginContext";

const Bottom = () => {
  const { isLoggedIn } = useLogin();
  const myPage = isLoggedIn ? "/mypage" : "/login";

  return (
    <div className="grid grid-cols-4 text-center absolute z-10 w-[600px] bg-white bottom-0 p-3 border">
      <Link to="/" className="flex flex-col justify-center items-center">
        <RiHome2Line size={40} />
        <div className="text-sm">홈</div>
      </Link>
      <div></div>
      <div></div>

      <Link to={myPage} className="flex flex-col justify-center items-center">
        <GoPerson size={40} />
        <div className="text-sm">마이페이지</div>
      </Link>
    </div>
  );
};

export default Bottom;
