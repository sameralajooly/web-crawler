import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const crawlUrl = (url: string) => api.post("/crawl", { address: url });

export const fetchUrls = () => api.get("/urls");

export const fetchUrlById = (id: string) => api.get(`/urls/${id}`);

export const deleteUrls = (ids: number[]) =>
  api.delete("/urls", {
    data: { ids },
  });

export const reanalyzeUrls = (ids: number[]) =>
  api.post("/urls/reanalyze", { ids });
