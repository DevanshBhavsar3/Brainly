import axios from "axios";
import { atom, selector, selectorFamily } from "recoil";
import { ContentData } from "../../types";

export const contentAtom = atom<ContentData[]>({
  key: "contentAtom",
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

export const sharedContentSelector = selectorFamily({
  key: "sharedContentSelector",
  get: (shareID: string) => async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/brain/${shareID}`,
      {},
      { withCredentials: true }
    );

    return response.data;
  },
});
