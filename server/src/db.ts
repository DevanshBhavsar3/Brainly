import { model, Schema, Types } from "mongoose";
import { contentTypesEnum } from "./type";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypesEnum, required: true },
  title: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: async (id: Types.ObjectId) => {
      const user = await User.findById(id);

      if (!user) {
        throw new Error("User doesn't exists.");
      }
    },
  },
});

const tagSchema = new Schema({
  title: { type: String, required: true, unique: true },
});

const linkSchema = new Schema({
  hash: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const User = model("user", userSchema);
export const Content = model("content", contentSchema);
export const Tag = model("tag", tagSchema);
export const Link = model("link", linkSchema);
