'use client'

import { useEffect, useState } from 'react';
import styles from './serieDetails.module.css'
import Details from "@/components/Movie/Details";
import api from '@/utils/api';
import { Movie } from '@/components/Movie/Card';
import Spinner from '@/components/Spinner/Spinner';
import { getMovieById } from '@/app/summary/[id]/page';

interface DetailsMovieProps {
  params: {
    id: string;
  };
}

export default function DetailsMovie({ params }: DetailsMovieProps) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedMovie = await getMovieById(params.id, 'tv');
      if (fetchedMovie) {
        setMovie(fetchedMovie);
      }
    };
    fetchData();
  }, [params.id]);

  if (!movie) {
    return (<Spinner />);
  }

  return (
    <main className={styles.details}>
      <h1>TV Shows</h1>
      <Details movie={movie} />
    </main>
  );
}
