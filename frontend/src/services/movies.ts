import { Movie } from "@/types/movies";
import api from "./api";


export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface MoviesResponse {
  data: Movie[];
  pagination: PaginationMeta;
}

export const movieService = {
  async getAll(params?: {
    name?: string;
    genre?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }): Promise<MoviesResponse> {
    const res = await api.get("/movies", { params });
    return res.data;
  },

  async getById(id: number): Promise<Movie> {
    const res = await api.get(`/movies/${id}`);
    return res.data;
  },

async create({ data, image }: { data: any; image?: File }): Promise<Movie> {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  if (image) formData.append("image", image);


  const res = await api.post("/movies", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
},


  async update({
    id,
    data,
    image,
  }: {
    id: number;
    data: Record<string, any>;
    image?: File;
  }): Promise<Movie> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (value?._isAMomentObject || value instanceof Date) {
          formData.append(key, new Date(value).toISOString());
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    if (image) formData.append("image", image);


    const res = await api.patch(`/movies/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },


  async delete(id: number): Promise<void> {
    await api.delete(`/movies/${id}`);
  },
};
