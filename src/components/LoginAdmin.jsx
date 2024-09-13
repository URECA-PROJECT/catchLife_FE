import React from 'react';

function LoginAdmin(props) {
    
    function handleSubmit(e){
        e.preventDefault();
    }
    
    return (
        <> 
        <form onSubmit={handleSubmit}>
            <span>유저</span>/
            <span>사장님</span><br/>
            
            <label>
                아이디 : 
                <input name='id'></input>
            </label><br></br>
            <label>
                비밀번호 : 
                <input type='password' name='pw'></input>
            </label><br></br>
            <label>
                    아이디 저장 :
                    <input type="checkbox" name='saveId'></input>
            </label>
            <label>
                    자동 로그인 :
                    <input type="checkbox" name='autoLogin'></input>
            </label><br></br>
            <input type='submit' value="로그인"></input><br/>
            <span>회원가입</span>
        </form>
        </>
    );
}

export default LoginAdmin;