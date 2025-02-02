export interface ContentData {
  id: string;
  type: contentTypesEnum;
  link: string;
  title: string;
  tags: string[];
}

export enum contentTypesEnum {
  Image = "Image",
  Video = "Video",
  Tweet = "Tweet",
  Documnet = "Document",
  Link = "Link",
}
