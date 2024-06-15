'use client'

import Image from 'next/image'
import styles from './Card.module.css'
import ButtonCategory from '../Buttons/ButtonCategory'
import imdb from '../../../public/imdb.svg'


interface Movie{
  id: string,
  title: string,
  genres: string[],
  IMDB: number,
  synopsis: string,
  poster_path: string
  // director: string,
  // cast: string[]
}
// id: movie.id,
//       title: movie.title,
//       genres: movie.genres.map((genre: any) => genre.name),
//       IMDB: movie.vote_average.toFixed(1),
//       synopsis: movie.overview,
//       poster_path: movie.poster_path,

interface DetailsProps{
  movie: Movie
}


export default function Details({movie}: DetailsProps){
  
  return (
    <div className={styles.card}>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt=''
        width={150}
        height={235}
      />

      <div className={styles.cardInfo}>
        <span className={styles.title}>{movie.title}</span>  
        <div className={styles.genre}>
          {movie.genres.map((genre, index)=>{
            return (
              <ButtonCategory key={`genre-${index}`}>{genre}</ButtonCategory>
            )
          })}
        </div>
        <div className={styles.imdb}>
          <Image src={imdb} alt=''/>
          <div className={styles.star}>
            {movie.IMDB}   
            ★
          </div>
          
        </div>
        <p className={styles.synopsis}>{movie.synopsis}</p>
        {/* <span>Director: {movie.director}</span> */}
        <span>Director: joão</span>
        <div className={styles.casts}>
            <span>Cast: &nbsp;</span>
            <div className={styles.cast}>
            {/* {movie.cast.map((cast,index)=>{
            return (
              <p key={`cast-${index}`}>{cast}</p>
            )})} */}
            <p>actor1</p>
            <p>actor2</p>
            </div>
        </div>
      </div>
    </div>
  )
} 