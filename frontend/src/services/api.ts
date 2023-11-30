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

  const response = await client.post<any>(
    `${process.env.REACT_APP_API_URL}/artist`,
    formData,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return response.data.artist;
}

async function findAllArtists(listFilter: string): Promise<Artist[]> {
  const client = httpClient();

  const token = sessionStorage.getItem("token");

  const response = await client.get<any>(
    `${process.env.REACT_APP_API_URL}/artist`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { listFilter },
    },
  );

  return response.data.artists;
}

async function auth(authFormData: AuthFormData): Promise<{ token: string }> {
  const client = httpClient();

  const response = await client.post<{ token: string }>(
    `${process.env.REACT_APP_API_URL}/auth/login`,
    authFormData,
  );

  return response.data;
}

const api = {
  auth,
  createArtist,
  findAllArtists,
};

export default api;
