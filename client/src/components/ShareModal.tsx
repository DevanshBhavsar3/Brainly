import axios from "axios";
import { CircleX, Copy, Share2 } from "lucide-react";
import { useState } from "react";

function ShareModal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  async function handleCopyLink() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/brain/share`,
        {
          share: true,
        },
        {
          withCredentials: true,
        }
      );

      navigator.clipboard.writeText(response.data.link);
      setIsModalOpen(!isModalOpen);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <button
        className="cursor-pointer bg-primary/20 hover:bg-primary-dark border-2 border-primary transition-all duration-200 px-2 py-1 rounded-md text-sm font-medium flex justify-center items-center gap-2"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <Share2 size={16} />
        Share Brain
      </button>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/60 flex justify-center items-center">
          <div className="bg-gray-700 mx-5 px-4 py-4 rounded-md border-2 border-white/10 flex flex-col justify-center">
            <div className="flex w-full justify-between items-start mb-3">
              <h1 className="text-2xl font-bold">Share your second brain</h1>

              <button
                className="cursor-pointer hover:bg-white/20 p-2 rounded-full transition-all duration-200"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                <CircleX />
              </button>
            </div>
            <p className="text-gray-300 max-w-md">
              Share your entire collection of notes, documents, tweets, and
              videos with others . They'll be able to import your content into
              their own Brainly account.
            </p>
            <button
              className="cursor-pointer bg-primary hover:bg-primary-dark transition-all duration-200 px-2 py-1 rounded-md mt-5 flex gap-3 justify-center items-center"
              onClick={handleCopyLink}
            >
              <Copy size={18} />
              Copy link
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ShareModal;
