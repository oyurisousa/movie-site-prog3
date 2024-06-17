// app/page.tsx

'use client';
import { useEffect, useState } from 'react';
import Card, { Movie } from "@/components/Movie/Card";
import api from "@/utils/api";
import Paginator from "@/components/Paginator/Paginator";
import Spinner from "@/components/Spinner/Spinner";
import Footer from "@/components/Footer/Footer";
import styles from "./page.module.css";
import Search from '@/components/Search/search';

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

interface GetMoviesResponse {
  data: MovieResponse[];
  page: number;
  totalPages: number;
  totalResults: number;
}

const getMovies = async (page: number | string = 1): Promise<GetMoviesResponse | null> => {
  try {
    const response = await api.get(`/discover/movie?page=${page}&primary_release_year=2024`);
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

const getMoviesByGenres = async (page: number | string = 1, genres: number[]): Promise<GetMoviesResponse | null> => {
  try {
    const response = await api.get(`/discover/movie?page=${page}&primary_release_year=2024&sort_by=popularity.desc&with_genres=${genres.join(',')}`);
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

const getMoviesByTitle = async (title: string, page: number | string = 1): Promise<GetMoviesResponse | null> => {
  try {
    const response = await api.get(`/search/movie?query=${title}&page=${page}&primary_release_year=2024`);
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

interface HomeProps {
  searchParams: {
    page?: string;
  };
}

export default function Home({ searchParams }: HomeProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [pagination, setPagination] = useState({
    page: 0,
    totalNumberPages: 0,
    totalNumberResults: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [submittedTitle, setSubmittedTitle] = useState(""); // Valor submetido para a busca

  const { page } = searchParams;

  const fetchMovies = async (genre: number | null, title: string, page: number | string = 1) => {
    setIsLoading(true);

    const genresList = await getGenres();
    setGenres(genresList);

    let moviesList;
    if (genre) {
      moviesList = await getMoviesByGenres(page, [genre]);
    } else if (title) {
      moviesList = await getMoviesByTitle(title, page); // Usar o título para buscar filmes
    } else {
      moviesList = await getMovies(page);
    }

    setPagination({
      page: moviesList?.page || 0,
      totalNumberPages: moviesList?.totalPages || 0,
      totalNumberResults: moviesList?.totalResults || 0,
    });

    const processedMovies = moviesList?.data.map((movie) => ({
      id: movie.id,
      title: movie.title,
      genres: movie.genre_ids.map((id) => {
        const genre = genresList.find((g) => g.id === id);
        return genre ? genre.name : "Unknown";
      }),
      IMDB: movie.vote_average.toFixed(1),
      synopsis: truncateText(movie.overview, 100),
      poster_path: movie.poster_path,
    }));

    setTimeout(() => {
      setMovies(processedMovies || []);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchMovies(selectedGenre, submittedTitle, page);
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
            <h2>All Films</h2>
            <Search onSearchSubmit={handleSearchSubmit} />
            <select className={styles.filterGenre} title="genres" name="genres" id="genres" onChange={handleGenreChange}>
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={`genre-${genre.id}`} value={genre.id}>{genre.name}</option>
              ))}
            </select>
            <div className={styles.cards}>
              {movies.map((movie, index) => (
                <Card key={`movie-${index}`} movie={movie} />
              ))}
            </div>

            <Paginator
              endpoint="/"
              numberOfItemsPerPage={20}
              page={pagination.page}
              totalNumberPages={pagination.totalNumberPages}
            />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
