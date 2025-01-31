import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="bg-black text-white h-screen py-32 flex justify-center items-center font-primary px-5">
      <div className="flex-col justify-center items-center gap-5 hidden md:flex">
        <p className="text-md md:text-xl font-semibold max-w-xs text-center text-gray-300">
          What if you could remember
          <span className="text-primary font-bold"> everything</span> important?
        </p>
        <div className="bg-gray-500 border-2 border-white/10 p-2 rounded-md text-sm flex flex-col justify-center items-center max-w-lg">
          <img
            src="https://petal-estimate-4e9.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F83737c59-0092-4a42-933b-0c6b658281a0%2FScreenshot_2024-11-16_at_5.29.15_PM.png?table=block&id=1407dfd1-0735-806d-830b-f76f9fab9859&spaceId=085e8ad8-528e-47d7-8922-a23dc4016453&width=1420&userId=&cache=v2"
            alt=""
          />
        </div>
      </div>

      <div className="outline-1 outline-white/10 h-full mx-10 hidden md:block" />

      <form className="flex flex-col px-5 text-sm text-center w-full md:max-w-xs">
        <h1 className="text-2xl font-bold my-5">Create your account</h1>

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
          Create Account
        </button>
        <Link
          to={"/login"}
          className="px-8 py-2 cursor-pointer outline-1 outline-white/20 font-medium rounded-md"
        >
          I already have an account
        </Link>
      </form>
    </div>
  );
}

export default Signup;
