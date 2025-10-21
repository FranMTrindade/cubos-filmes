export interface CreateMovieDto {
  name: string;
  genre: string;
  description?: string;
  releaseDate: string;
}

export interface Movie {
  id: number;
  name: string;
  description: string;
  genre: string;
  rating: number;
  trailerUrl?: string;
  imageUrl: string;
  releaseDate: string;
  duration: number;
  status: string;
  language: string;
  budget: number;
  revenue: number;
  profit: number;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  pagination?: any;
  isOwner?: boolean;  
}


export interface UpdateMovieDto extends Partial<CreateMovieDto> {}
