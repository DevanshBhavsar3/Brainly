declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export enum contentTypesEnum {
  Image = "image",
  Video = "video",
  Audio = "audio",
  Article = "article",
  Tweet = "tweet",
  Documnet = "document",
  Link = "link",
}
