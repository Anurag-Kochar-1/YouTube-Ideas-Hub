import axios from "axios";
import { type Request, type Response } from "express";

export class YoutubeController {
  static async searchYoutubeChannel(req: Request, res: Response) {
    try {
      const youtubeKey = process.env.YOUTUBE_KEY;
      const query = req.query.q;
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${query}&maxResults=5&key=${youtubeKey}`
      );
      res.json(response.data);
    } catch (error) {
      res.json(error);
    }
  }
  static async getYoutubeChannelByChanneldId(req: Request, res: Response) {
    try {
      const id = req.query.id;
      const youtubeKey = process.env.YOUTUBE_KEY;
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${id}&key=${youtubeKey}`
      );
      res.json(response.data);
    } catch (error) {
      res.json(error);
    }
  }
}
