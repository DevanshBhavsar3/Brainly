declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export enum contentTypesEnum {
  Image = "Image",
  Video = "Video",
  Tweet = "Tweet",
  Documnet = "Document",
  Link = "Link",
}
