import AuthForm from "./AuthForm";
import Navbar from "./Navbar";

function Signup() {
  return (
    <main>
      <Navbar />
      <div className="bg-black text-white h-screen py-32 flex justify-center items-center font-primary">
        <div className="flex-col justify-center items-center gap-5 hidden md:flex">
          <p className="text-md md:text-xl font-semibold max-w-xs text-center text-gray-300">
            What if you could remember
            <span className="text-primary font-bold"> everything </span>
            important?
          </p>
          <img src="/signup_image.svg" alt="thinking_image" className="w-64" />
        </div>

        <div className="outline-1 outline-white/10 h-full mx-10 hidden md:block" />

        <div className="w-full md:w-sm">
          <h1 className="text-2xl font-bold my-5 text-center">
            Create your account
          </h1>
          <AuthForm endpoint="signup" />
        </div>
      </div>
    </main>
  );
}

export default Signup;
