import React from 'react';

function SignupUser(props) {
    return (
        <>
            <form>
                <label>
                    이름 : 
                    <input name='name' type='text'></input>
                </label><br></br>
                <label>
                    아이디 : 
                    <input name='id' type='text'></input>
                </label><br></br>
                <label>
                    비밀번호 : 
                    <input type='password' name='pw'></input>
                </label><br></br>
                <label>
                    전화번호 : 
                    <input name='pn'></input>
                </label><br></br>
                <label>생년월일 : 
                    <input type='date' name='dt' ></input>
                </label><br></br>
            </form>
        </>
    );
}

export default SignupUser;