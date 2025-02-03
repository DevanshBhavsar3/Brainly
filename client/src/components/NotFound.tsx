import Footer from "./Footer";
import Navbar from "./Navbar";

function NotFound() {
  return (
    <>
      <Navbar />
      <div className="h-screen bg-black text-white font-primary flex justify-center items-center">
        <h1 className="text-3xl font-bold">404 Not Found</h1>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
