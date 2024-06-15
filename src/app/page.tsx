'use client'
import { useEffect, useState } from "react";
import Card, { Movie } from "@/components/Movie/Card";
import api from "@/utils/api";

interface Genre {
  id: number;
  name: string;
}

interface MovieResponse {
  id: number;
  title: string;
  genre_ids: number[];
  vote_average: number;
  overview: string;
  poster_path: string;
}

const getMovies = async (page: number) => {
  try {
    const response = await api.get(`/discover/movie?page=${page}&primary_release_year=2024`);
    return response.data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const getGenres = async () => {
  try {
    const response = await api.get(`/genre/movie/list`);
    return response.data.genres;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const genresList = await getGenres();
      setGenres(genresList);

      const moviesList = await getMovies(1);
      const processedMovies = moviesList.map((movie: MovieResponse) => {
        const movieGenres = movie.genre_ids.map((id) => {
          const genre = genresList.find((g: any) => g.id === id);
          return genre ? genre.name : "Unknown";
        });

        return {
          id: movie.id,
          title: movie.title,
          genres: movieGenres,
          IMDB: movie.vote_average.toFixed(1),
          synopsis: truncateText(movie.overview, 100),  
          poster_path: movie.poster_path,
        };
      });

      setMovies(processedMovies);
    };

    fetchData();
  }, []);  

  return (
    <main>
      {movies.map((movie, index) => (
        <Card key={`movie-${index}`} movie={movie} />
      ))}
    </main>
  );
}