import React from "react";
import SignupUser from "../../components/SignupUser";
import SignupAdmin from "../../components/SignupAdmin";

function Signup(props) {
  return (
    <>
      <h1>회원가입 페이지</h1>
      <SignupAdmin />
    </>
  );
}

export default Signup;
