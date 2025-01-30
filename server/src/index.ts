import express, { Request, Response } from "express";
import z from "zod";
import dotenv from "dotenv";
import { Content, Link, User } from "./db";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import { JWT_SECRET } from "./config";
import { authMiddleware } from "./middleware";
import { contentTypesEnum, RequestWithUserId } from "./type";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

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

    res.cookie("token", token);

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

    res.cookie("token", token);

    res.status(200).json({ message: "Signed In successfully." });
  } catch (e) {
    res.status(500).json({ error: "Internal server error." });
  }
});

app.post(
  "/api/v1/content",
  authMiddleware,
  async (req: RequestWithUserId, res) => {
    const contentBody = z.object({
      type: z.string(),
      link: z.string().url(),
      title: z.string(),
      tags: z.array(z.string()),
    });

    const { error, success, data } = contentBody.safeParse(req.body);
    const userId = req.userId;

    if (!success) {
      res.status(411).json({ error: "Invalid content." });
      return;
    }

    try {
      await Content.create({
        title: data.title,
        type: data.type,
        link: data.link,
        tags: data.tags,
        userId,
      });

      res.status(200).json({ message: "Content added successfully." });
    } catch (e) {
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

app.get(
  "/api/v1/content",
  authMiddleware,
  async (req: RequestWithUserId, res) => {
    const userId = req.userId;

    const contents = await Content.find({ userId });

    res.status(200).json({ contents });
  }
);

app.delete(
  "/api/v1/content",
  authMiddleware,
  async (req: RequestWithUserId, res) => {
    const { id } = req.body;
    const userId = req.userId;

    try {
      const content = await Content.findById(id);

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
  }
);

app.post(
  "/api/v1/brain/share",
  authMiddleware,
  async (req: RequestWithUserId, res) => {
    const { share }: { share: boolean } = req.body;
    const userId = req.userId;

    if (!userId) return;

    if (share) {
      const hash = await bcrypt.hash(userId, 7);

      Link.create({
        hash,
        userId,
      });

      res.json({ link: "http://localhost:2000/api/v1/brain/" + hash });
      return;
    } else {
      res.status(200).json({ message: "Your second brain is now private." });
    }
  }
);

app.post("/api/v1/brain/:shareLink", authMiddleware, async (req, res) => {
  const shareId = req.params.shareLink;

  try {
    const link = await Link.findOne({ hash: shareId });

    if (!link) {
      res.status(404).json({ error: "Sharelink doesn't exist or expired." });
      return;
    }

    const contents = await Content.find({ userId: link.userId });

    console.log(link);
    console.log(contents);

    res.status(200).json({
      megs: "noice",
    });
  } catch (e) {
    res.status(500).json({ error: "Internal server error." });
  }
});

async function main() {
  await mongoose.connect(process.env.MONGO_URI || "");

  app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
}

main();
