import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="bg-black text-white flex flex-col items-center bg-radial font-primary">
      <section className="py-32 md:py-64 max-w-7xl mx-auto flex flex-col justify-center items-center gap-2.5 px-5">
        <h1 className="text-6xl font-secondary relative text-center">
          Your external hard drive for thoughts.
        </h1>

        <p className="max-w-lg text-center text-md">
          Organize your thoughts, fuel your creativity, and achieve your goals.
          Start building your knowledge base today.
        </p>
        <button className="group mt-5 text-sm font-medium">
          <Link
            to={"/signup"}
            className="bg-primary hover:bg-primary-dark px-4 py-2 rounded-md flex gap-1 transition-all duration-200"
          >
            <p>Sign Up</p>
          </Link>
        </button>
      </section>

      <section className="my-10 max-w-7xl mx-auto flex flex-col w-full justify-between items-center gap-1 px-5">
        <h1 className="text-md md:text-xl font-semibold text-center">
          Simple, intuitive, and powerful.
        </h1>
        <p className="text-center text-sm md:text-base">
          Capture your thoughts instantly, access them anytime.
        </p>
        <div className="w-full bg-gray-500 rounded-xl border-4 border-primary my-5">
          <img
            src="https://petal-estimate-4e9.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F83737c59-0092-4a42-933b-0c6b658281a0%2FScreenshot_2024-11-16_at_5.29.15_PM.png?table=block&id=1407dfd1-0735-806d-830b-f76f9fab9859&spaceId=085e8ad8-528e-47d7-8922-a23dc4016453&width=1420&userId=&cache=v2"
            alt=""
            className="rounded-lg"
          />
        </div>
      </section>

      <section className="my-10 max-w-7xl mx-auto flex w-full justify-center md:justify-between items-center gap-1 px-5">
        <div className="flex flex-col justify-center items-start text-md md:text-xl font-semibold max-w-md text-left">
          <p className="">It's not about remembering everything.</p>
          <p className=" text-gray-200">
            It's about having a reliable place to find everything.
          </p>

          <button className="group mt-5 text-sm font-medium">
            <Link
              to={"/signup"}
              className="bg-primary hover:bg-primary-dark px-4 py-2 rounded-md flex gap-1 transition-all duration-200"
            >
              <p>Sign Up</p>
            </Link>
          </button>
        </div>
        <div className="flex-1 h-2/3 bg-gray-500 hidden md:block">
          <img
            src="https://petal-estimate-4e9.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F085e8ad8-528e-47d7-8922-a23dc4016453%2F83737c59-0092-4a42-933b-0c6b658281a0%2FScreenshot_2024-11-16_at_5.29.15_PM.png?table=block&id=1407dfd1-0735-806d-830b-f76f9fab9859&spaceId=085e8ad8-528e-47d7-8922-a23dc4016453&width=1420&userId=&cache=v2"
            alt=""
          />
        </div>
      </section>
    </main>
  );
}

export default Home;
