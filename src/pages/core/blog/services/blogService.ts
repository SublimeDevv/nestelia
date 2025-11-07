import { httpClient } from "@/services/httpClient";
import type { PostModel } from "../models";

const baseUrl = import.meta.env.API_URL || "/api";

export const getBlogPosts = async () => {
  const response = await httpClient.get(`${baseUrl}/post`);
  return response.data;
};

export const CreatePost = async (post: PostModel) => {
  const response = await httpClient.post(`${baseUrl}/post`, post);
  return response.data;
};