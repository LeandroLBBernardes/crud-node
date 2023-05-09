import { Request, Response } from "express";

import Post from "../schemas/Post";

class PostController {
  public async getAllPosts(req: Request, res: Response): Promise<Response> {
    try {
      const post = await Post.find();

      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  public async getPostById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const post = await Post.findOne({ _id: id });

      if (!post) {
        return res.status(422).json({ message: "Post not found!" });
      }

      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  public async createPost(req: Request, res: Response): Promise<Response> {
    const { title, content } = req.body;

    if (!title) {
      return res.status(422).json({ error: "Title is required!" });
    }

    const post = {
      title,
      content,
    };

    try {
      await Post.create(post);

      return res.status(201).json({ message: "Post created successfully!" });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  public async updatePost(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = {
      title,
      content,
    };

    try {
      const updatedPost = await Post.updateOne({ _id: id }, post);

      if (updatedPost.matchedCount === 0) {
        return res.status(422).json({ message: "Post not found!" });
      }

      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  public async deletePost(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const post = await Post.findOne({ _id: id });

      if (!post) {
        return res.status(422).json({ message: "Post not found!" });
      }

      await Post.deleteOne({ _id: id });

      return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}

export default new PostController();
