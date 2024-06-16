'use client'

import { useEffect, useState } from 'react';
import styles from './Details.module.css'
import Details from "@/components/Movie/Details";
import api from '@/utils/api';
import { Movie } from '@/components/Movie/Card';
import Spinner from '@/components/Spinner/Spinner';

// interface Movie {
//   id: string;
//   title: string;
//   genres: string[];
//   IMDB: string;
//   synopsis: string;
//   poster_path: string;
// }

const getMovieById = async (id: number | string): Promise<Movie | null> => {
  try {
    const response = await api.get(`/movie/${id}`);
    const movie = response.data;
    return {
      id: movie.id,
      title: movie.title,
      genres: movie.genres.map((genre: any) => genre.name),
      IMDB: movie.vote_average.toFixed(1),
      synopsis: movie.overview,
      poster_path: movie.poster_path,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

interface DetailsMovieProps {
  params: {
    id: string;
  };
}

export default function DetailsMovie({ params }: DetailsMovieProps) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedMovie = await getMovieById(params.id);
      if (fetchedMovie) {
        setMovie(fetchedMovie);
      }
    };
    fetchData();
  }, [params.id]);

  if (!movie) {
    return (<Spinner/>); 
  }

  return (
    <main className={styles.details}>
      <Details movie={movie} />
    </main>
  );
}
