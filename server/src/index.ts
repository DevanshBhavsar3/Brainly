import bcrypt from "bcrypt";
import crypto from "node:crypto";
import cookieParser from "cookie-parser";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import z from "zod";
import { JWT_SECRET } from "./config";
import { Content, Link, Tag, User } from "./db";
import { authMiddleware } from "./middleware";
import { contentTypesEnum } from "./type";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://brainly-sigma.vercel.app",
      "https://brainly-devanshs-projects-42de0e47.vercel.app",
      "https://brainly-git-main-devanshs-projects-42de0e47.vercel.app",
    ],
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

const requiredCredentials = z.object({
  username: z
    .string()
    .min(3, "Username should not be shorter than 3 character.")
    .max(10, "Username should not be longer than 10 character."),
  password: z
    .string()
    .min(8, "Password should not be shorter than 8 character.")
    .max(20, "Password should not be longer than 20 character.")
    .refine(
      (password) => /[A-Z]/.test(password),
      "Password must atleast contain 1 Uppercase character."
    )
    .refine(
      (password) => /[a-z]/.test(password),
      "Password must atleast contain 1 Lowercase character."
    )
    .refine(
      (password) => /[1-9]/.test(password),
      "Password must atleast contain 1 Number."
    )
    .refine(
      (password) => /[!@#&*?]/.test(password),
      "Password must atleast contain 1 Special character."
    ),
});

app.post("/api/v1/signup", async (req, res) => {
  const { error, success, data } = requiredCredentials.safeParse(req.body);

  if (!success) {
    res.status(411).json({ error: error.issues[0].message });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(data.password, 7);

    const isUserExists = await User.findOne({ username: data.username });
    if (isUserExists) {
      res.status(403).json({ error: "User already exists." });
      return;
    }

    const user = await User.create({
      username: data.username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET
    );

    res.cookie("token", token, {
      secure: true,
      httpOnly: true,
    });

    res.status(200).json({ message: "Signed Up successfully." });
  } catch (e) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { error, success, data } = requiredCredentials.safeParse(req.body);

  if (!success) {
    res.status(411).json({ error: error.issues[0].message });
    return;
  }

  try {
    const user = await User.findOne({ username: data.username });
    if (!user) {
      res.status(403).json({ error: "User doesn't exists." });
      return;
    }

    const isRightPassword = await bcrypt.compare(data.password, user.password);
    if (!isRightPassword) {
      res.status(403).json({ error: "Invalid password." });
      return;
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET
    );

    res.cookie("token", token, { secure: true, httpOnly: true });

    res.status(200).json({ message: "Signed In successfully." });
  } catch (e) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/api/v1/content", authMiddleware, async (req, res) => {
  const contentBody = z.object({
    type: z.nativeEnum(contentTypesEnum),
    link: z.string().url(),
    title: z.string(),
    tags: z.array(z.string()),
  });

  const { success, data } = contentBody.safeParse(req.body);
  const userId = req.userId;

  if (!success) {
    res.status(411).json({ error: "Invalid content." });
    return;
  }

  try {
    const tagIds: string[] = [];

    await Promise.all(
      data.tags.map(async (title) => {
        const tag = await Tag.findOne({ title });

        if (!tag) {
          const newTag = await Tag.create({ title });

          tagIds.push(newTag._id.toString());
          return;
        }

        if (tagIds.includes(tag._id.toString())) return;
        tagIds.push(tag._id.toString());
      })
    );

    await Content.create({
      title: data.title,
      type: data.type,
      link: data.link,
      tags: tagIds,
      userId,
    });

    res.status(200).json({ message: "Content added successfully." });
  } catch (e) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.get("/api/v1/content", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const contents = await Content.find({ userId }).populate<{
    tags: (typeof Tag.prototype)[];
  }>("tags");

  const formattedContents = contents.map((content) => ({
    id: content._id,
    type: content.type,
    link: content.link,
    title: content.title,
    tags: content.tags.map((tag) => tag.title),
  }));

  res.status(200).json({ contents: formattedContents });
});

app.delete("/api/v1/content", authMiddleware, async (req, res) => {
  const { id } = req.body;
  const userId = req.userId;

  try {
    const content = await Content.findOne({ _id: id });

    if (!content) {
      res.status(400).json({ error: "Content not found." });
      return;
    }

    if (content.userId.toString() !== userId) {
      res.status(403).json({ error: "Unautorized operation." });
      return;
    }

    await Content.findByIdAndDelete(content._id);

    res.status(200).json({ message: "Content deleted successly." });
  } catch (e) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/api/v1/brain/share", authMiddleware, async (req, res) => {
  const { share }: { share: boolean } = req.body;
  const userId = req.userId;

  try {
    const existedLink = await Link.findOne({ userId });

    if (share) {
      if (existedLink) {
        res.status(200).json({
          link: `${process.env.FRONTEND_URL}/brain/${existedLink.hash}`,
        });
        return;
      }

      const hash = crypto.createHash("sha256").update(userId).digest("hex");

      await Link.create({
        hash,
        userId,
      });

      res
        .status(200)
        .json({ link: `${process.env.FRONTEND_URL}/brain/${hash}` });
    } else {
      if (!existedLink) {
        res
          .status(400)
          .json({ error: "Your second brain is already private." });
        return;
      }

      await Link.deleteOne({ userId });

      res.status(200).json({ message: "Your second brain is now private." });
    }
  } catch (e) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post("/api/v1/brain/:shareLink", authMiddleware, async (req, res) => {
  const shareId = req.params.shareLink;

  try {
    const link = await Link.findOne({ hash: shareId })
      .populate<{ userId: typeof User.prototype }>("userId")
      .exec();

    if (!link) {
      res.status(404).json({ error: "Sharelink doesn't exist or expired." });
      return;
    }

    const contents = await Content.find({ userId: link.userId._id }).populate<{
      tags: (typeof Tag.prototype)[];
    }>("tags");

    const formattedContents = contents.map((content) => ({
      id: content._id,
      type: content.type,
      link: content.link,
      title: content.title,
      tags: content.tags.map((tag) => tag.title),
    }));

    res
      .status(200)
      .json({ username: link.userId.username, contents: formattedContents });
  } catch (e) {
    res.status(500).json({ error: "Internal server error." });
  }
});

async function main() {
  await mongoose.connect(process.env.MONGO_URI || "");

  app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
}

main();
