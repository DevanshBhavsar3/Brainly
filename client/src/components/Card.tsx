import { memo } from "react";
import { ContentData } from "../types";
import {
  Clapperboard,
  FileText,
  Image,
  Link2,
  Trash,
  Twitter,
} from "lucide-react";
import axios from "axios";

const Card = memo(
  ({ content, shared }: { content: ContentData; shared: boolean }) => {
    async function handleDelete() {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/content`, {
          data: {
            id: content.id,
          },
          withCredentials: true,
        });

        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    }

    function getIcon() {
      switch (content.type) {
        case "Image":
          return <Image size={16} />;
        case "Video":
          return <Clapperboard size={16} />;
        case "Tweet":
          return <Twitter size={16} />;
        case "Document":
          return <FileText size={16} />;
        case "Link":
          return <Link2 size={16} />;
      }
    }

    return (
      <div className="w-full h-fit bg-gray-700 border-2 border-white/10 px-4 py-2 rounded-md flex flex-col justify-between items-start gap-5">
        <div className="w-full flex justify-between items-center gap-3">
          <div className="flex justify-center items-center gap-3">
            {getIcon()}
            <p className="text-lg font-medium">{content.title}</p>
          </div>
          {!shared && (
            <div
              className="hover:bg-white/20 rounded-full p-1 transition-all duration-200 cursor-pointer"
              onClick={handleDelete}
            >
              <Trash size={16} />
            </div>
          )}
        </div>

        <a target="_blank" href={content.link}>
          {content.link}
        </a>

        <div className="flex flex-wrap gap-3">
          {content.tags.map((tag, index) => (
            <p
              key={index}
              className="bg-primary/20 border-2 border-primary w-fit px-4 py-1 rounded-full text-sm"
            >
              {tag}
            </p>
          ))}
        </div>
      </div>
    );
  }
);

export default Card;
