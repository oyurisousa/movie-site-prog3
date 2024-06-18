'use client'
import Spinner from "@/components/Spinner/Spinner";
import api from "@/utils/api";
import { useEffect, useState } from "react";
import { Genre, getGenres, truncateText } from "../page";
import SerieCard from "@/components/Serie/Serie";
import styles from './series.module.css'

export interface Serie {
  id: string;
  name: string;
  genres: string[];
  IMDB: string;
  synopsis: string;
  poster_path: string;
}

interface SerieResponse {
  id: number;
  name: string;
  genre_ids: number[];
  vote_average: number;
  overview: string;
  poster_path: string;
}

interface GetSerieResponse {
  data: SerieResponse[];
  page: number;
  totalPages: number;
  totalResults: number;
}

const getSeries = async (page: number | string = 1): Promise<GetSerieResponse | null> => {
  try {
    const response = await api.get(`discover/tv?page=${page}&include_adult=true&include_null_first_air_dates=false&language=en-US&sort_by=popularity.desc`);
    return {
      data: response.data.results,
      page: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

interface SeriesProps {
  searchParams: {
    page: string;
  };
}

const Series = ({ searchParams }: SeriesProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [series, setSeries] = useState<Serie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const { page } = searchParams;



  const fetchSeries = async (page: number | string = 1) => {
    setIsLoading(true);

    const genresList = await getGenres('tv');
    setGenres(genresList);

    const seriesList = await getSeries(page);
    const processedSeries = seriesList?.data.map((serie) => ({
      id: serie.id.toString(),
      name: serie.name,
      genres: serie.genre_ids.map((id) => {
        const genre = genresList.find((g) => g.id === id);
        return genre ? genre.name : "Unknown";
      }), // Replace this with actual genre names if needed
      IMDB: serie.vote_average.toFixed(1),
      synopsis: truncateText(serie.overview, 100),
      poster_path: serie.poster_path,
    }));
    setSeries(processedSeries || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSeries(page);
    // setSeries([{
    //   id: '76479',
    //   poster_path: '/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg',
    //   genres: [
    //     'teste',
    //     'teste',
    //     'teste'
    //   ],
    //   IMDB: '78',
    //   name: 'The boys',
    //   synopsis: 'A group of vigilantes known informally as “The Boys” set out to take down corrupt superheroes with no more than blue-collar grit and a willingness to fight dirty'
    // }])
  }, [page]);

  return (
    <>
      <main className={styles.main}>
        {isLoading ? (
          <Spinner />
        ) : (
          series.map((serie: Serie) => (
            <>
              <SerieCard key={`serie-${serie.id}`} serie={serie} />
            </>
          ))
        )}
      </main>
    </>
  );
}

export default Series;
