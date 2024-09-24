import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import '../App.css';
import "../css/Signup.css";

function SignupAdmin1(props) {
    const navigate = useNavigate();
    const location = useLocation(); 

    const isUserSignup = location.pathname === '/signupUser'; 
    const isAdminSignup = location.pathname === '/signupAdmin1';

    return (
        <div className="login-container">
            <h1 className='signup-h1'>CATCH LIFE</h1>
            <div className="user-type">
                <Link 
                    to="/signupUser"
                    className={isUserSignup ? 'active-link' : 'inactive-link'}
                >유저</Link>
                <span className="separator">|</span>
                <Link 
                    to="/signupAdmin1"
                    className={isAdminSignup ? 'active-link' : 'inactive-link'}
                >사장님</Link>
            </div>

            <form>
                <div className='signup-div'>
                    <label className='signup-label'>이름</label>
                    <input className='signup-input' name="name" type="text" placeholder="이름" />
                </div>
                <div className='signup-div'>
                    <label className='signup-label'>아이디</label>
                    <input className='signup-input' name="id" type="text" placeholder="아이디" />
                </div>
                <div className='signup-div'>
                    <label className='signup-label'>비밀번호</label>
                    <input className='signup-input' name="password" type="password" placeholder="비밀번호" />
                </div>
                <div className='signup-div'>
                    <label className='signup-label'>전화번호</label>
                    <input className='signup-input' name="phone" type="tel" placeholder="전화번호" />
                <button type="button" className="navigation-button" onClick={() => navigate('/signupAdmin2')}>
                    다음
                </button>
                <button type="button" className="cancel-button" onClick={() => navigate("/")}>
                    취소
                </button>
                </div>
                
            </form>
        </div>
    );
}

export default SignupAdmin1;
