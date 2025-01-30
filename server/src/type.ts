import { Request } from "express";

export interface RequestWithUserId extends Request {
  userId?: string;
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
