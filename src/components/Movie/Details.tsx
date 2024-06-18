'use client'

import Image from 'next/image'
import styles from './Details.module.css'
import ButtonCategory from '../Buttons/ButtonCategory'
import imdb from '../../../public/imdb.svg'


interface Movie{
  id: string,
  title: string,
  genres: string[],
  IMDB: number,
  synopsis: string,
  poster_path: string
}


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
        
      </div>
    </div>
  )
} 