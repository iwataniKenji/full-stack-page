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

  const response = await client.post<Artist>(
    `${process.env.REACT_APP_API_URL}/artist`,
    formData,
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return response.data;
}

async function findAllArtists(listFilter: string): Promise<Artist[]> {
  const client = httpClient();

  const token = sessionStorage.getItem("token");

  const response = await client.get<Artist[]>(
    `${process.env.REACT_APP_API_URL}/artist`,
    {
      headers: { Authorization: `Bearer ${token}` },
      params: { listFilter },
    },
  );

  return response.data;
}

async function auth(authFormData: AuthFormData): Promise<string> {
  const client = httpClient();

  const response = await client.post<string>(
    `${process.env.REACT_APP_API_URL}/auth/login`,
    authFormData,
  );

  return response.data;
}

async function logout(): Promise<void> {
  const client = httpClient();

  await client.post<void>(`${process.env.REACT_APP_API_URL}/auth/logout`);
}

const api = {
  auth,
  logout,
  createArtist,
  findAllArtists,
};

export default api;
