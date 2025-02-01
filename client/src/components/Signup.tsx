import AuthForm from "./AuthForm";

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

      <div className="w-full md:w-sm">
        <h1 className="text-2xl font-bold my-5 text-center">
          Create your account
        </h1>
        <AuthForm endpoint="signup" />
      </div>
    </div>
  );
}

export default Signup;
