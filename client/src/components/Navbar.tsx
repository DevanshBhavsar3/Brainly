import { AlignJustify } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menubarVisibility, setMenubarVisibility] = useState(false);

  return (
    <nav className="z-20 fixed w-full text-white font-primary font-medium max-w-sm md:max-w-2xl lg:max-w-7xl mx-auto my-2 py-5 px-4 md:px-10 rounded-lg left-1/2 -translate-x-1/2 bg-gray-500/80 backdrop-blur-lg">
      <div className="flex justify-between items-center">
        <Link
          to={"/"}
          className="text-2xl hover:scale-105 transition-all duration-200"
        >
          Brainly
        </Link>
        <div className="flex text-md justify-center items-center gap-5">
          <Link
            to={"/login"}
            className="hidden md:block text-gray-200 hover:text-white transition-all duration-200"
          >
            Login
          </Link>
          <button>
            <Link
              to={"/signup"}
              className="hidden md:block bg-primary hover:bg-primary-dark px-4 py-2 rounded-full"
            >
              Signup
            </Link>
          </button>
          <button
            className="md:hidden cursor-pointer"
            onClick={() => setMenubarVisibility(!menubarVisibility)}
          >
            <AlignJustify />
          </button>
        </div>
      </div>
      <div
        className={`my-5 flex-col justify-center items-start gap-5 text-gray-200 transition-all  ${
          menubarVisibility ? "flex" : "hidden"
        }`}
      >
        <Link to={"/login"} className="hover:text-white">
          Login
        </Link>
        <button>
          <Link to={"/signup"} className="hover:text-white">
            Signup
          </Link>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
