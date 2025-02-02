import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { currentTabContentsSelectorFamily } from "../store/contentAtom";
import { ContentData } from "../types";
import AddContentModal from "./AddContentModal";
import Card from "./Card";
import CardSkeleton from "./CardSkeleton";
import ShareModal from "./ShareModal";
import Sidebar from "./Sidebar";

function Notes() {
  const navigate = useNavigate();
  const params = useParams();
  const contentsState = useRecoilValueLoadable(
    currentTabContentsSelectorFamily(params.shareId || null)
  );
  const [sidebarVisibility, setSidebarVisibility] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
  }, []);

  return (
    <main className="min-h-screen flex bg-black text-white font-primary">
      <Sidebar
        isVisible={sidebarVisibility}
        setIsVisible={setSidebarVisibility}
      />
      <div className="w-full flex flex-col justify-start items-start mx-5 mb-5">
        <div className="w-full flex flex-col md:flex-row justify-between items-center mb-5">
          <h1 className="text-3xl font-semibold text-white my-6">
            {contentsState.contents.username || "Your"} Notes
          </h1>
          {params.shareId ? (
            <button className="cursor-pointer bg-primary/20 hover:bg-primary-dark border-2 border-primary transition-all duration-200 px-2 py-1 rounded-md text-sm font-medium flex justify-center items-center gap-2">
              <Link to={"/brain"}>Your brain</Link>
            </button>
          ) : (
            <div className="flex justify-center items-center gap-3">
              <ShareModal />
              <AddContentModal />
            </div>
          )}
        </div>
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {contentsState.state === "loading" ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : contentsState.state === "hasError" ? (
            <div>There was an error fetching notes.</div>
          ) : contentsState.contents.contents.length === 0 ? (
            <div>It's empty here!</div>
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

export default Notes;
