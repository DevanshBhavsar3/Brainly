import {
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  FileText,
  Image,
  Layers,
  Link2,
  Twitter,
} from "lucide-react";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentTabAtom } from "../store/contentAtom";

function Sidebar({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (visibility: boolean) => void;
}) {
  const tabs = [
    { title: "All", icon: <Layers size={18} /> },
    { title: "Image", icon: <Image size={18} /> },
    { title: "Video", icon: <Clapperboard size={18} /> },
    { title: "Tweet", icon: <Twitter size={18} /> },
    { title: "Document", icon: <FileText size={18} /> },
    { title: "Link", icon: <Link2 size={18} /> },
  ];

  if (!isVisible) {
    return (
      <button
        className="absolute md:static hover:bg-white/20 rounded-r-full py-1 self-start mt-5 cursor-pointer"
        onClick={() => setIsVisible(!isVisible)}
      >
        <ChevronRight />
      </button>
    );
  }

  return (
    <div
      className={`fixed md:sticky top-0 w-full md:w-1/5 bg-gray-700 text-gray-200 h-screen px-4 py-2 border-r-2 border-r-white/10 transition-all`}
    >
      <h1 className="w-full text-lg font-semibold text-white cursor-pointer my-3 flex justify-between items-center">
        <Link to={"/"}>Brainly</Link>
        <div
          className="hover:bg-white/20 rounded-full transition-all duration-200"
          onClick={() => setIsVisible(!isVisible)}
        >
          <ChevronLeft />
        </div>
      </h1>

      <ul className="flex flex-col justify-center items-start gap-2 font-medium">
        {tabs.map((tab, index) => (
          <TabButton key={index} title={tab.title} icon={tab.icon} />
        ))}
      </ul>
    </div>
  );
}

function TabButton({ title, icon }: { title: string; icon: ReactElement }) {
  const [currentTab, setCurrentTab] = useRecoilState(currentTabAtom);

  return (
    <li
      className={`w-full px-2 py-1 flex items-center gap-2 cursor-pointer transition-all duration-200 rounded-md ${
        currentTab === title ? "bg-white text-black" : "hover:bg-white/5"
      }`}
      onClick={() => setCurrentTab(title)}
    >
      {icon}
      {title}
    </li>
  );
}

export default Sidebar;
