'use client'

import Image from 'next/image'
import styles from './Details.module.css'
import ButtonCategory from '../Buttons/ButtonCategory'
import imdb from '../../../public/imdb.svg'


interface Movie {
  id: string,
  title: string,
  genres: string[],
  IMDB: number,
  synopsis: string,
  poster_path: string
}

interface Serie {
  id: string,
  name: string,
  genres: string[],
  IMDB: number,
  synopsis: string,
  poster_path: string
}

interface DetailsProps {
  movie: Movie | Serie
  type?: 'movie' | 'tv'
}


export default function Details({ movie, type = 'movie' }: DetailsProps) {
  console.log(movie)
  return (
    <div className={styles.card}>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt=''
        width={150}
        height={235}
      />

      <div className={styles.cardInfo}>
        {type === 'movie' ? (
          <span className={styles.title}>{movie.title}</span>

        ) : (
          <span className={styles.title}>{movie.name}</span>

        )}
        <div className={styles.genre}>
          {movie.genres.map((genre, index) => {
            return (
              <ButtonCategory key={`genre-${index}`}>{genre}</ButtonCategory>
            )
          })}
        </div>
        <div className={styles.imdb}>
          <Image src={imdb} alt='' />
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