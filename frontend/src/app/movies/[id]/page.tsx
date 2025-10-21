"use client";

import { useParams, useRouter } from "next/navigation";
import { useMovieById } from "@/hooks/useMovies";
import { Spin, Tag, Typography, Progress, Button } from "antd";
import Image from "next/image";
import back from "@/public/back.png";
import { InfoBox } from "@/app/components/infoBox";
import ReactPlayer from "react-player";
import { useTheme } from "@/context/themeContext";
import { useState } from "react";
import { movieService } from "@/services/movies";
import MovieFormModal from "@/app/components/movieFormModal";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify"; 
import { useAuthGuard } from "@/hooks/useAuthGuard";

const { Title, Text } = Typography;

export default function MovieDetailsPage() {
  useAuthGuard();
  const { id } = useParams();
  const movieId = Number(id);
  const { data: movie, isLoading } = useMovieById(movieId);
  const { isDark } = useTheme();
  const router = useRouter();


  const [editOpen, setEditOpen] = useState(false);

  if (isLoading) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          isDark ? "bg-black text-[#E4E4E7]" : "bg-[#F7F7F7] text-[#6F6D78]"
        }`}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
          isDark ? "bg-black text-[#E4E4E7]" : "bg-[#F7F7F7] text-[#6F6D78]"
        }`}
      >
        Filme não encontrado.
      </div>
    );
  }

  const ratingValue = movie.rating ? Math.round(movie.rating * 10) : 0;

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "#4CAF50";
    if (rating >= 5) return "#FCD73D";
    return "#F44336";
  };

  const handleDelete = async () => {
    try {
      await movieService.delete(movieId);
      toast.success( "Filme deletado com sucesso!" );
      router.push("/movies");
    } catch (error) {
      toast.error( "Erro ao deletar o filme." );
    }
  };


  return (
    <div
      className={`relative min-h-screen flex flex-col items-center transition-colors duration-300 ${
        isDark ? "bg-black text-[#E4E4E7]" : "bg-[#F7F7F7] text-[#6F6D78]"
      }`}
    >
      <Image
        src={movie.imageUrl || back}
        alt="Cinema background"
        fill
        className={`object-cover ${
          isDark ? "opacity-60" : "opacity-25 brightness-105"
        }`}
        priority
      />
      <div
        className={`absolute inset-0 bg-gradient-to-t ${
          isDark
            ? "from-black via-black/90 to-transparent"
            : "from-[#EDEDED]/80 via-[#F7F7F7]/60 to-transparent"
        }`}
      />

      <div
        className={`relative z-10 max-w-[1200px] w-full px-6 py-10 grid md:grid-cols-[300px_1fr] mt-2 gap-10 rounded-xl backdrop-blur-lg transition-all duration-300 ${
          isDark ? "bg-[#EBEAF814]" : "bg-[#F8F8F880]"
        }`}
        style={{
          border: isDark
            ? "1px solid rgba(255,255,255,0.05)"
            : "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div className="relative w-full h-[450px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={movie.imageUrl}
            alt={movie.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <Title
                level={2}
                className={`m-0 font-semibold ${
                  isDark ? "text-[#E4E4E7]" : "text-[#6F6D78]"
                }`}
              >
                {movie.name}
              </Title>
              <Text
                className={`block ${
                  isDark ? "text-[#A1A1AA]" : "text-[#8C8C8C]"
                }`}
              >
                Título original: {movie.name}
              </Text>
              <p
                className={`italic mt-2 ${
                  isDark ? "text-[#A1A1AA]" : "text-[#8C8C8C]"
                }`}
              >
                Todo herói tem um começo.
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <Progress
                type="circle"
                percent={ratingValue}
                size={80}
                strokeColor={getRatingColor(movie.rating)}
                trailColor={isDark ? "rgba(255,255,255,0.1)" : "#D1D1D1"}
                format={(percent) => (
                  <span
                    className={`font-semibold ${
                      isDark ? "text-[#E4E4E7]" : "text-[#6F6D78]"
                    }`}
                  >
                    {percent}%
                  </span>
                )}
              />

              {movie.isOwner && (
                <>
                  <Button
                    type="primary"
                    className={`w-24 border-none ${
                      isDark
                        ? "bg-[#BE93E4] hover:!bg-[#a56fd8]"
                        : "bg-[#8E4EC6] hover:!bg-[#7d3db4]"
                    }`}
                onClick={handleDelete}
                  >
                    Deletar
                  </Button>
                  <Button
                    type="primary"
                    className={`w-24 border-none ${
                      isDark
                        ? "bg-[#8E4EC6] hover:!bg-[#7d3db4]"
                        : "bg-[#BE93E4] hover:!bg-[#a56fd8]"
                    }`}
                    onClick={() => setEditOpen(true)}
                  >
                    Editar
                  </Button>
                </>
              )}
            </div>
          </div>

          <div>
            <Title
              level={4}
              className={`mt-4 ${
                isDark ? "text-[#E4E4E7]" : "text-[#6F6D78]"
              }`}
            >
              Sinopse
            </Title>
            <Text
              className={`leading-relaxed whitespace-pre-line ${
                isDark ? "text-[#C5C5C7]" : "text-[#6F6D78]"
              }`}
            >
              {movie.description}
            </Text>
          </div>

          <div>
            <Title
              level={4}
              className={`mt-4 ${
                isDark ? "text-[#E4E4E7]" : "text-[#6F6D78]"
              }`}
            >
              Gêneros
            </Title>
            <div className="flex flex-wrap gap-2">
              {movie.genre?.split(",").map((g) => (
                <Tag
                  key={g}
                  color={isDark ? "#8E4EC6" : "#BE93E4"}
                  className={isDark ? "text-[#E4E4E7]" : "text-[#6F6D78]"}
                >
                  {g.trim()}
                </Tag>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <InfoBox label="Lançamento" value={movie.releaseDate} />
            <InfoBox label="Duração" value={`${movie.duration} min`} />
            <InfoBox label="Idioma" value={movie.language} />
            <InfoBox label="Situação" value={movie.status} />
            <InfoBox label="Orçamento" value={`$${movie.budget}M`} />
            <InfoBox label="Lucro" value={`$${movie.profit}M`} />
          </div>
        </div>
      </div>

      {movie.trailerUrl && (
        <div className="relative z-10 w-full max-w-[1200px] mb-2 mt-10 px-6">
          <Title
            level={3}
            className={`mb-4 ${
              isDark ? "text-[#E4E4E7]" : "text-[#6F6D78]"
            }`}
          >
            Trailer
          </Title>
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            <ReactPlayer
              src={movie.trailerUrl}
              width="100%"
              height="100%"
              controls
            />
          </div>
        </div>
      )}

      {movie.isOwner && (
        <MovieFormModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          movieId={movie.id}
          onSuccess={() => {
            setEditOpen(false);
          }}
        />
      )}
    </div>
  );
}
