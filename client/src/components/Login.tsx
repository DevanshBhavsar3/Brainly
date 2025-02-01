import AuthForm from "./AuthForm";

function Login() {
  return (
    <div className="bg-black text-white h-screen py-32 flex flex-col justify-center items-center font-primary">
      <h1 className="text-2xl font-bold my-5 text-center">Login to Brainly</h1>
      <AuthForm endpoint="signin" />
    </div>
  );
}

export default Login;
