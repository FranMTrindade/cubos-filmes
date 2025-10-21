"use client";

import { useState } from "react";
import Image from "next/image";
import { Pagination, Spin } from "antd";
import back from "@/public/back.png";
import { Movie } from "@/types/movies";
import { useMovies } from "@/hooks/useMovies";
import MovieCard from "../components/movieCard";
import { useTheme } from "@/context/themeContext";
import MovieFormModal from "../components/movieFormModal";
import MoviesControl from "../components/moviesControler";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function MoviesPage() {
  useAuthGuard();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const { isDark } = useTheme();

  const { data, isLoading } = useMovies({ ...filters, page, limit: 10 });
  const movies = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div
      className={`relative flex flex-col items-center min-h-screen w-full overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-black text-white" : "bg-[#323035] text-[#5A5A66]"
      }`}
    >
      <Image
        src={back}
        alt="Cinema background"
        fill
        className={`object-cover ${
          isDark ? "opacity-60" : "opacity-25 brightness-75"
        }`}
        priority
      />

      <div
        className={`absolute inset-0 bg-gradient-to-t ${
          isDark
            ? "from-black via-black/90 to-transparent"
            : "from-[#DCDCDC]/80 via-[#E7E7E7]/60 to-transparent"
        }`}
      />

      <div
        className={`relative z-10 w-[1322px] max-w-[95%] min-h-[782px] rounded-xl backdrop-blur-lg p-6 flex flex-col gap-6 items-center shadow-lg/40 transition-all duration-500 ${
          isDark
            ? "bg-[#EBEAF814] border border-white/10 text-white"
            : "bg-[#EBEAF814] border border-black/10 text-[#5A5A66]"
        }`}
      >
        <MoviesControl
          onFilterChange={(f: any) => {
            setPage(1);
            setFilters(f);
          }}
          onAddMovie={() => setOpenModal(true)}
        />

        {isLoading ? (
          <Spin size="large" className="mt-20" />
        ) : movies.length === 0 ? (
          <p className="text-center mt-10 text-gray-400">
            Nenhum filme encontrado.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
              {movies.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {pagination && (
              <div className="mt-8 flex justify-center w-full">
                <Pagination
                  current={pagination.page}
                  total={pagination.total}
                  pageSize={pagination.limit}
                  onChange={(p) => setPage(p)}
                  showSizeChanger={false}
                  className={`${
                    isDark
                      ? "[&_.ant-pagination-item]:!border-none text-white"
                      : "[&_.ant-pagination-item]:!border-none text-[#5A5A66]"
                  }`}
                />
              </div>
            )}
          </>
        )}
      </div>

      <MovieFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={() => setOpenModal(false)}
      />
    </div>
  );
}
