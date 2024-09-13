import React from 'react';

function SignupAdmin(props) {
    return (
        <>
            <form>
                <span>유저</span>/
                <span>사장님</span><br/>
                    <label>
                        이름: 
                        <input name='name' type='text'></input>
                    </label><br />

                    <label>
                        아이디: 
                        <input name='id' type='text'></input>
                    </label><br />

                    <label>
                        비밀번호: 
                        <input name='password' type='password'></input>
                    </label><br />

                    <label>
                        전화번호: 
                        <input name='phone' type='tel'></input>
                    </label><br />

                    <label>
                        매장명(한글): 
                        <input name='storeNameKor' type='text'></input>
                    </label><br />

                    <label>
                        매장명(영문): 
                        <input name='storeNameEng' type='text'></input>
                    </label><br />

                    <label>
                        매장 전화번호: 
                        <input name='storePhone' type='tel'></input>
                    </label><br />

                    <label>
                        업종: 
                        <select name='businessType'>
                            <option value=''>선택하세요</option>
                            <option value='restaurant'>음식점</option>
                            <option value='retail'>소매업</option>
                            
                        </select>
                    </label><br />

                    <label>
                        지역: 
                        <select name='region'>
                            <option value=''>선택하세요</option>
                            <option value='seoul'>서울</option>
                            <option value='busan'>부산</option>
                            
                        </select>
                    </label><br />

                    <label>
                        오픈시간: 
                        <input name='openTime' type='time' />
                    </label><br />

                    <label>
                        마감시간: 
                        <input name='closeTime' type='time' />
                    </label><br />

                    <button type="submit">회원가입</button>
                    <button type="button">취소</button>
            </form>
        </>
    );
}

export default SignupAdmin;