import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import '../App.css';
import "../css/Signup.css";

function SignupAdmin2(props) {
    const navigate = useNavigate();
    const location = useLocation(); 

    const isUserSignup = location.pathname === '/signupUser'; 
    const isAdminSignup = location.pathname === '/signupAdmin1';

    return (
        <div className="login-container">
            <h1>CATCH LIFE</h1>
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
                <div>
                    <label>매장명(한글)</label>
                    <input name="storeNameKor" type="text" placeholder="매장명(한글)" />
                </div>
                <div>
                    <label>매장명(영문)</label>
                    <input name="storeNameEng" type="text" placeholder="매장명(영문)" />
                </div>
                <div>
                    <label>매장 전화번호</label>
                    <input name="storePhone" type="tel" placeholder="매장 전화번호" />
                </div>
                <div>
                    <label>업종</label>
                    <select name="businessType">
                        <option value="">선택하세요</option>
                        <option value="restaurant">음식점</option>
                        <option value="retail">소매업</option>
                    </select>
                </div>
                <div>
                    <label>지역</label>
                    <select name="region">
                        <option value="">선택하세요</option>
                        <option value="seoul">서울</option>
                        <option value="busan">부산</option>
                    </select>
                </div>
                <div>
                    <label>오픈시간</label>
                    <input name="openTime" type="time" />
                </div>
                <div>
                    <label>마감시간</label>
                    <input name="closeTime" type="time" />
                </div>

                <button type="submit" className="submit-button">회원가입</button>
                <button type="button" className="cancel-button" onClick={() => navigate("/")}>
                    취소
                </button>
                <button type="button" className="cancel-button" onClick={() => navigate("/signupAdmin1")}>
                    뒤로가기
                </button>
            </form>
        </div>
    );
}

export default SignupAdmin2;
