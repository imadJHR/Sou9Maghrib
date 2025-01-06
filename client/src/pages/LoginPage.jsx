import { SignIn } from "@clerk/clerk-react";

const LoginPage = () => {
  return (
    <div className="flex item-center justify-center h-screen ">
      <div className="flex justify-center items-center ">
        <SignIn signUpUrl="/register" />
      </div>
    </div>
  );
};

export default LoginPage;
