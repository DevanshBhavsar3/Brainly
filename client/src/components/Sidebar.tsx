import {
  Clapperboard,
  FileText,
  Image,
  Layers,
  Link2,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-gray-700 text-gray-200 h-full w-1/5 px-4 py-2 border-r-2 border-r-white/10">
      <h1 className="text-lg font-semibold text-white cursor-pointer w-fit my-5">
        <Link to={"/"}>Brainly</Link>
      </h1>

      <ul className="flex flex-col justify-center items-start gap-2 font-medium">
        <li className="w-full px-2 py-1 flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-all duration-200 rounded-md bg-white text-black">
          <Layers size={18} />
          All
        </li>
        <li className="w-full px-2 py-1 flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-all duration-200 rounded-md">
          <Image size={18} />
          Images
        </li>
        <li className="w-full px-2 py-1 flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-all duration-200 rounded-md">
          <Clapperboard size={18} />
          Videos
        </li>
        <li className="w-full px-2 py-1 flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-all duration-200 rounded-md">
          <Twitter size={18} />
          Tweets
        </li>
        <li className="w-full px-2 py-1 flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-all duration-200 rounded-md">
          <FileText size={18} />
          Documents
        </li>
        <li className="w-full px-2 py-1 flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-all duration-200 rounded-md">
          <Link2 size={18} />
          Links
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
