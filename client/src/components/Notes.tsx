import { useRecoilValueLoadable } from "recoil";
import { contentAtom } from "../store/atoms/contentAtom";
import Sidebar from "./Sidebar";
import Card from "./Card";
import AddContentModal from "./AddContentModal";

function Notes() {
  const contentsState = useRecoilValueLoadable(contentAtom);

  if (contentsState.state === "loading") {
  } else if (contentsState.state === "hasError") {
  } else {
    return (
      <main className="h-screen flex bg-black text-white font-primary">
        <Sidebar />
        <div className="w-full flex flex-col justify-start items-start mx-10">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-xl font-semibold text-white my-6">All Notes</h1>
            <AddContentModal />
          </div>
          <div className="w-full grid grid-cols-4 gap-10">
            {contentsState.contents.contents.map((content) => (
              <Card key={content.id} content={content} />
            ))}
          </div>
        </div>
      </main>
    );
  }
}

export default Notes;
