"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { movieService, MoviesResponse } from "@/services/movies";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify"; 


export const useMovies = (params?: {
  name?: string;
  genre?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}) =>
  useQuery<MoviesResponse>({
    queryKey: ["movies", params],
    queryFn: () => movieService.getAll(params),
  });


export const useMovieById = (id?: number) =>
  useQuery({
    queryKey: ["movie", id],
    queryFn: () => movieService.getById(id!),
    enabled: !!id,
  });

export const useCreateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
      image,
    }: {
      data: any;
      image?: File;
    }) => {
      return movieService.create({ data, image });
    },
    onSuccess: () => {
      toast.success("Filme criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
    onError: (err: any) => {
      console.error(err);
      toast.error("Erro ao criar filme.");
    },
  });
};

export const useUpdateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
      image,
    }: {
      id: number;
      data: Record<string, any>;
      image?: File;
    }) => {
      return movieService.update({ id, data, image });
    },
    onSuccess: (data, variables) => {
      toast.success("Filme atualizado com sucesso!");

      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["movie", variables.id] });
    },
    onError: (err: any) => {
      console.error(" Erro ao atualizar filme:", err);
      toast.error("Erro ao atualizar filme.");
    },
  });
};

