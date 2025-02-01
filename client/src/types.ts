export interface ContentData {
  id: string;
  type: contentTypesEnum;
  link: string;
  title: string;
  tags: string[];
}

export enum contentTypesEnum {
  Image = "image",
  Video = "video",
  Tweet = "tweet",
  Documnet = "document",
  Link = "link",
}
