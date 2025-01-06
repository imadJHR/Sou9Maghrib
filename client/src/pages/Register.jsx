import {  SignUp } from "@clerk/clerk-react";

const LoginPage = () => {
  return (
    <div className="flex item-center justify-center h-screen ">
      <div className="flex justify-center items-center ">
        <SignUp signInUrl="/login" />
      </div>
    </div>
  );
};

export default LoginPage;
