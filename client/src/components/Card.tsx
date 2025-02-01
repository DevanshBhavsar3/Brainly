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

const Card = memo(({ content }: { content: ContentData }) => {
  function getIcon() {
    switch (content.type) {
      case "image":
        return <Image size={16} />;
      case "video":
        return <Clapperboard size={16} />;
      case "tweet":
        return <Twitter size={16} />;
      case "document":
        return <FileText size={16} />;
      case "link":
        return <Link2 size={16} />;
    }
  }
  return (
    <div className="w-full bg-gray-700 border-2 border-white/10 px-4 py-2 rounded-md flex flex-col justify-between items-start gap-5">
      <div className="w-full flex justify-between items-center gap-3">
        <div className="flex justify-center items-center gap-3">
          {getIcon()}
          <p className="text-lg font-medium">{content.title}</p>
        </div>
        <div className="hover:bg-white/20 rounded-full p-1 transition-all duration-200 cursor-pointer">
          <Trash size={16} />
        </div>
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
});

export default Card;
