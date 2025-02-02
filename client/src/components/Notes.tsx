import { useRecoilValueLoadable } from "recoil";
import { contentAtom, sharedContentSelector } from "../store/atoms/contentAtom";
import Sidebar from "./Sidebar";
import Card from "./Card";
import AddContentModal from "./AddContentModal";
import ShareModal from "./ShareModal";
import { useParams } from "react-router-dom";
import { ContentData } from "../types";

function Notes() {
  const params = useParams();

  let contentsState;

  if (params.shareId) {
    contentsState = useRecoilValueLoadable(
      sharedContentSelector(params.shareId)
    );
  } else {
    contentsState = useRecoilValueLoadable(contentAtom);
  }

  if (contentsState.state === "loading") {
  } else if (contentsState.state === "hasError") {
  } else {
    return (
      <main className="h-screen flex bg-black text-white font-primary">
        <Sidebar />
        <div className="w-full flex flex-col justify-start items-start mx-10">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-xl font-semibold text-white my-6">All Notes</h1>
            {!params.shareId && (
              <div className="flex justify-center items-center gap-3">
                <ShareModal />
                <AddContentModal />
              </div>
            )}
          </div>
          <div className="w-full  grid grid-cols-4 gap-2">
            {contentsState.contents.length === 0 ? (
              <div className="col-span-4 flex justify-center items-center text-gray-200 font-medium">
                Nothing Here
              </div>
            ) : (
              contentsState.contents.contents.map((content: ContentData) => (
                <Card
                  key={content.id}
                  content={content}
                  shared={params.shareId ? true : false}
                />
              ))
            )}
          </div>
        </div>
      </main>
    );
  }
}

export default Notes;
