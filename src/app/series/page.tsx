'use client';
import { useEffect, useState } from 'react';
import api from "@/utils/api";
import Paginator from "@/components/Paginator/Paginator";
import Spinner from "@/components/Spinner/Spinner";
import styles from "./series.module.css";
import Search from '@/components/Search/search';
import SerieCard from '@/components/Serie/Serie';

export interface Genre {
  id: number;
  name: string;
}

interface SeriesResponse {
  id: number;
  name: string;
  genre_ids: number[];
  vote_average: number;
  overview: string;
  poster_path: string;
}

interface GetSeriesResponse {
  data: SeriesResponse[];
  page: number;
  totalPages: number;
  totalResults: number;
}

const getSeries = async (page: number | string = 1): Promise<GetSeriesResponse | null> => {
  try {
    const response = await api.get(`/discover/tv?page=${page}`);
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

const getSeriesByGenres = async (page: number | string = 1, genres: number[]): Promise<GetSeriesResponse | null> => {
  try {
    const response = await api.get(`/discover/tv?page=${page}&first_air_date_year=2024&sort_by=popularity.desc&with_genres=${genres.join(',')}`);
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

const getSeriesByTitle = async (title: string, page: number | string = 1): Promise<GetSeriesResponse | null> => {
  try {
    const response = await api.get(`/search/tv?query=${title}&page=${page}&first_air_date_year=2024`);
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

const getGenres = async () => {
  try {
    const response = await api.get(`/genre/tv/list`);
    return response.data.genres;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

interface SeriesProps {
  searchParams: {
    page?: string;
  };
}

export default function Series({ searchParams }: SeriesProps) {
  const [series, setSeries] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [pagination, setPagination] = useState({
    page: 0,
    totalNumberPages: 0,
    totalNumberResults: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [submittedTitle, setSubmittedTitle] = useState("");

  const { page } = searchParams;

  const fetchSeries = async (genre: number | null, title: string, page: number | string = 1) => {
    setIsLoading(true);

    const genresList = await getGenres();
    setGenres(genresList);

    let seriesList;
    if (genre) {
      seriesList = await getSeriesByGenres(page, [genre]);
    } else if (title) {
      seriesList = await getSeriesByTitle(title, page);
    } else {
      seriesList = await getSeries(page);
    }

    setPagination({
      page: seriesList?.page || 0,
      totalNumberPages: seriesList?.totalPages || 0,
      totalNumberResults: seriesList?.totalResults || 0,
    });

    const processedSeries = seriesList?.data.map((serie) => ({
      id: serie.id,
      title: serie.name,
      genres: serie.genre_ids.map((id) => {
        const genre = genresList.find((g) => g.id === id);
        return genre ? genre.name : "Unknown";
      }),
      IMDB: serie.vote_average.toFixed(1),
      poster_path: serie.poster_path,
    }));

    setSeries(processedSeries || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSeries(selectedGenre, submittedTitle, page);
  }, [page, selectedGenre, submittedTitle]);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = e.target.value ? parseInt(e.target.value) : null;
    setSelectedGenre(genreId);
  };

  const handleSearchSubmit = (title: string) => {
    setSubmittedTitle(title);
  };

  return (
    <>
      <main className={styles.main}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className={styles.top}>
              <h2>All Series</h2>
              <div className={styles.filters}>
                <Search onSearchSubmit={handleSearchSubmit} />
                <select className={styles.filterGenre} title="genres" name="genres" id="genres" onChange={handleGenreChange} value={selectedGenre || ""}>
                  <option value="">All Genres</option>
                  {genres.map((genre) => (
                    <option key={`genre-${genre.id}`} value={genre.id}>{genre.name}</option>
                  ))}
                </select>

              </div>
            </div>
            <div className={styles.cards}>
              {series.map((serie, index) => (
                <SerieCard key={`serie-${index}`} serie={serie} />
              ))}
            </div>

            <Paginator
              endpoint="/series"
              numberOfItemsPerPage={20}
              page={pagination.page}
              totalNumberPages={pagination.totalNumberPages}
            />
          </>
        )}
      </main>
    </>
  );
}