import axios from "axios";
import { atom, atomFamily, selectorFamily } from "recoil";
import { ContentData } from "../types";

export const contentAtom = atomFamily({
  key: "contentAtom",
  default: selectorFamily<
    { contents: ContentData[]; username?: string },
    string | null
  >({
    key: "contentSelector",
    get: (id: string | null) => async () => {
      if (!id) {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/content/`,
          {
            withCredentials: true,
          }
        );
        return response.data;
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/brain/${id}`,
          {},
          { withCredentials: true }
        );

        return response.data;
      }
    },
  }),
});

export const currentTabContentsSelectorFamily = selectorFamily<
  { contents: ContentData[]; username?: string },
  string | null
>({
  key: "currentTabContentsSelectorFamily",
  get:
    (content: string | null) =>
    ({ get }) => {
      const contents = get(contentAtom(content));
      const currentTab = get(currentTabAtom);

      if (currentTab === "All") return contents;

      const filteredContent = contents.contents.filter(
        (c) => c.type === currentTab
      );

      return { ...contents, contents: filteredContent };
    },
});

export const currentTabAtom = atom({
  key: "currentTabAtom",
  default: "All",
});
