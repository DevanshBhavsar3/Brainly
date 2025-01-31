import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="bg-black text-white h-screen py-32 flex flex-col justify-center items-center font-primary">
      <form className="flex flex-col px-5 text-sm w-full md:max-w-xs mx-auto text-center">
        <h1 className="text-2xl font-bold my-5">Log in to Brainly</h1>

        <input
          type="text"
          id="username"
          className="py-2 px-4 outline-1 outline-white/20 rounded-md mb-5 bg-gray-500"
          placeholder="Username"
        />

        <input
          type="text"
          id="password"
          className="py-2 px-4 outline-1 outline-white/20 rounded-md mb-5 bg-gray-500"
          placeholder="Password"
        />

        <button className="px-4 py-2 font-medium rounded-md bg-white text-black mb-5 cursor-pointer shadow-[0_0px_30px_rgba(0,0,0,0.25)] transition-all duration-500 hover:shadow-primary">
          Login
        </button>
        <Link
          to={"/signup"}
          className="px-4 py-2 outline-1 outline-white/20 font-medium rounded-md cursor-pointer"
        >
          Don't have an account? Sign up
        </Link>
      </form>
    </div>
  );
}

export default Login;
