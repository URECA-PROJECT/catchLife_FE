import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import '../App.css';
import "../css/Login.css";

function LoginAdmin(props) {
    const navigate = useNavigate();
    const location = useLocation(); 
    const [ id, setId ] = useState('');
    const [ password, setPassword ] = useState('');
    
    function handleSubmit(e){
        e.preventDefault();
    }

    const isUserLogin = location.pathname === '/loginUser'; 
    const isAdminLogin = location.pathname === '/loginAdmin'; 
    const isAdminSignup = location.pathname === '/signupAdmin'; 


    return (
        <> 
    <div className="login-container">
        <h1 className='login-h1'>CATCH LIFE</h1>
        <div className="user-type">
            <Link 
                to="/loginUser" 
                className={location.pathname === '/loginUser' ? 'active-link' : 'inactive-link'}>
                유저
            </Link>
            <span className="separator">|</span>
            <Link 
                to="/loginAdmin" 
                className={location.pathname === '/loginAdmin' ? 'active-link' : 'inactive-link'}>
                사장님
            </Link>
        </div>

        <form onSubmit={handleSubmit}>
            <div className='login-div'>
                <label className='login-label'>아이디</label>
                <input
                    className='login-input'
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="아이디를 입력하세요"
                />
            </div>
            <div className='login-div'>
                <label className='login-label'>비밀번호</label>
                <input
                    className='login-input'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력하세요"
                />
            </div>
                <button type="submit" className="submit-button">로그인</button>
        </form>

        <div className='login-div'>
            <Link to={"/signupAdmin1"}
                className="signup-link"
                >회원가입</Link>
            <Link to={"/"}
                className="signup-link"
                >메인</Link>
        </div>
        </div>
        </>
    );
}

export default LoginAdmin;
