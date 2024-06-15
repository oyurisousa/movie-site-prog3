'use client'
import Card, { Movie } from "@/components/Movie/Card";
import api from "@/utils/api";
import { useEffect, useState } from "react";

interface Genre{
  id: number,
  name: string
}

const getMovies = async (page: number)=>{
  const data = await api.get(`/discover/movie?page=${page}&primary_realease_year=2024`)
    .then(response => response.data)
    .catch(err=> console.log(err))
  
  console.log(data)
  return data.results
}

const getGenres = async ()=>{
  const data = await api.get(`/genre/movie/list`)
    .then(response => response.data)
    .catch(err=> console.log(err))

  return data.genres
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  
    // getGenres().then(response =>{
    //   const genresList = response.map((genre: any)=>{
    //     genre = {
    //       id: genre.id,
    //       name: genre.name
    //     }
    //     return genre
    //   })
    //   setGenres(genresList)
    // })
  useEffect(()=>{
    getMovies(1).then(response => {
      const moviesList = response.map((movie: any)=>{
        movie = {
          id: movie.id,
          title: movie.title,
          genres: movie.genre_ids.map((id: number)=>{
            genres.map((genre)=>{
              if(genre.id === id){
                return genre.name
              }
            })
          }),
          IMDB: movie.vote_average.toFixed(1),
          synopsis: movie.overview,
          poster_path: movie.poster_path
        }

        return movie
      }) 


      setMovies(moviesList)
      console.log(movies)
      console.log(response)
      console.log(moviesList)
    })
  }, [genres, movies])
  return (
    <main>
      {movies.map((movie, index)=>{     
        return <Card key={`movie-${index}`} movie={movie}/>
      })}
    </main>
  )
}
