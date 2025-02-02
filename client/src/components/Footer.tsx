import { Github } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-500 text-gray-200 text-sm font-medium">
      <div className="max-w-7xl mx-auto p-5 flex justify-between items-center">
        <h1 className="">Brainly</h1>
        <a
          target="_blank"
          href="https://github.com/DevanshBhavsar3/Brainly"
          className="hover:bg-white/10 rounded-full p-1 transition-all duration-200"
        >
          <Github />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
