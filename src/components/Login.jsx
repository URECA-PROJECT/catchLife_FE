import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import '../App.css';
import "../css/Login.css";

function Login(props) {
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

        <form onSubmit={handleSubmit}>
            <div className="login-login-div">
                <label className='login-login-label'>
                    <input
                            className='login-login-input'
                            type="radio"
                            name="gender"
                            value="고객"
                    /> 고객
                </label>
                <label className='login-login-label' style={{ marginLeft: '20px' }}>
                    <input
                            className='login-login-input'
                            type="radio"
                            name="gender"
                            value="관리자"
                        /> 관리자
                </label>
            </div>
            <div className='login-div'>
                {/* <label className='login-label'>아이디</label> */}
                <input
                    className='login-input'
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="아이디"
                />
            </div>
            <div className='login-div'>
                {/* <label className='login-label'>비밀번호</label> */}
                <input
                    className='login-input'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                />
            </div>
            <div className='login-button-div'>
                <button type="submit" className="submit-button">로그인</button>
                <button type="button" className="cancel-button" onClick={() => navigate("/")}>
                    취소
                </button>
            </div>
        </form>

        <div className='login-bottom-div'>
            <Link to={"/signup"}
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

export default Login;
