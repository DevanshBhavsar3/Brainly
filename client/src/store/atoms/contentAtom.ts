import axios from "axios";
import { atom, selector } from "recoil";
import { ContentData } from "../../types";

export const contentAtom = atom<{ contents: ContentData[] }>({
  key: "contenAtom",
  default: selector({
    key: "contentSelector",
    get: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/content`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    },
  }),
});
