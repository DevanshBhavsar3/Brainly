import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-black text-white flex flex-col items-center bg-radial font-primary">
        <section className="py-40 md:py-64 max-w-7xl mx-auto flex flex-col justify-center items-center gap-2.5 px-5">
          <div className="absolute top-24 left-0 w-2/3 h-2 bg-red-400 blur-3xl rounded-full animate-blur transition-all"></div>
          <div className="absolute top-1/4 right-0 w-1/2 h-3 bg-red-400 blur-3xl rounded-full animate-blur transition-all"></div>
          <div className="absolute bottom-1/3 left-0 w-1/4 h-2 bg-red-400 blur-3xl rounded-full animate-blur transition-all"></div>
          <div className="absolute bottom-1/4 right-0 w-1/2 h-1 bg-red-400 blur-3xl rounded-full animate-blur transition-all"></div>
          <div className="absolute bottom-10 left-0 w-2/3 h-2 bg-red-400 blur-3xl rounded-full animate-blur transition-all"></div>

          <h1 className="text-6xl font-secondary relative text-center">
            Your external hard drive for thoughts.
          </h1>

          <p className="max-w-lg text-center text-md">
            Organize your thoughts, fuel your creativity, and achieve your
            goals. Start building your knowledge base today.
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

        <section className="my-20 max-w-7xl mx-auto flex flex-col w-full justify-between items-center gap-1 px-5 relative">
          <h1 className="text-md md:text-xl font-semibold text-center">
            Simple, intuitive, and powerful.
          </h1>
          <p className="text-center text-sm md:text-base">
            Capture your thoughts instantly, access them anytime.
          </p>

          <div className="absolute top-10 w-full h-full bg-white/20 blur-2xl"></div>
          <div className="z-10 w-full bg-gray-500 rounded-xl border-4 border-primary my-5 ">
            <img
              src="/demo.png"
              alt="main_page_demo"
              className="z-10 rounded-lg"
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
            <img src="/share_demo.png" alt="sharing_screen_demo" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
