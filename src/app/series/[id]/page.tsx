'use client'

import { useEffect, useState } from 'react';
import styles from './serieDetails.module.css'
import Details from "@/components/Movie/Details";
import { Movie } from '@/components/Movie/Card';
import Spinner from '@/components/Spinner/Spinner';
import { getMovieById } from '@/app/summary/[id]/page';

interface DetailsSerieProps {
  params: {
    id: string;
  };
}

export default function DetailsSerie({ params }: DetailsSerieProps) {
  const [serie, setSerie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedMovie = await getMovieById(params.id, 'tv');
      if (fetchedMovie) {
        setSerie(fetchedMovie);
      }
    };
    fetchData();
  }, [params.id]);

  if (!serie) {
    return (<Spinner />);
  }
  console.log(serie)

  return (
    <main className={styles.details}>
      <Details type='tv' movie={serie} />
    </main>
  );
}
