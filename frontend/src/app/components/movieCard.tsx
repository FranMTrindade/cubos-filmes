"use client";

import { useState } from "react";
import { Card, Progress, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Movie } from "@/types/movies";

const { Title, Text } = Typography;

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const router = useRouter();
  const [hover, setHover] = useState(false);

  const ratingValue = movie.rating ? Math.round(movie.rating * 10) : 0;


  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "#4CAF50"; 
    if (rating >= 5) return "#FCD73D"; 
    return "#F44336"; 
  };

  return (
    <Card
      hoverable
      onClick={() => router.push(`/movies/${movie.id}`)} 
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="bg-[#1E1E1E] border-none relative overflow-hidden rounded-md transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
      style={{
        width: 235,
        height: 355,
      }}
      cover={
        <div className="relative w-full h-[355px]">
          {/* 🎞️ Poster */}
          <Image
            src={movie.imageUrl}
            alt={movie.name}
            fill
            className="object-cover rounded-md"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent"></div>

          {hover && movie.rating && (
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300">
              <Progress
                type="circle"
                percent={ratingValue}
                size={100}
                strokeWidth={8}
                trailColor="rgba(255,255,255,0.2)"
                strokeColor={getRatingColor(movie.rating)}
                format={(percent) => (
                  <span className="text-xl font-bold text-white">{percent}%</span>
                )}
              />
            </div>
          )}
        </div>
      }
    >
     <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
        <Title
          level={5}
          className="text-white m-0 leading-tight uppercase text-sm truncate"
        >
          {movie.name}
        </Title>

        <Text
          className={`block text-white text-xs transition-all duration-300 ${
            hover ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
          }`}
        >
          {movie.genre}
        </Text>
      </div>
    </Card>
  );
}



