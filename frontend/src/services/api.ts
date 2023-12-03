import axios, { AxiosInstance } from "axios";
import { AuthFormData } from "../types/AuthFormData";
import { CreateArtistFormData } from "../types/CreateArtistFormData";
import { Artist } from "../types/Artist";

function httpClient(): AxiosInstance {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  });
}

async function createArtist(formData: CreateArtistFormData): Promise<Artist> {
  const client = httpClient();

  const token = sessionStorage.getItem("token");

  const response = await client.post<Artist>("/artist", formData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}

async function findAllArtists(listFilter: string): Promise<Artist[]> {
  const client = httpClient();

  const token = sessionStorage.getItem("token");

  const response = await client.get<Artist[]>("/artist", {
    headers: { Authorization: `Bearer ${token}` },
    params: { listFilter },
  });

  return response.data;
}

async function auth(authFormData: AuthFormData): Promise<string> {
  const client = httpClient();

  const response = await client.post<string>("/auth/login", authFormData);

  return response.data;
}

const api = {
  auth,
  createArtist,
  findAllArtists,
};

export default api;
