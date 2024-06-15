'use client'

import Image from 'next/image'
import styles from './Card.module.css'
import banner from '../../../public/test.png'
import ButtonCategory from '../Buttons/ButtonCategory'
import imdb from '../../../public/imdb.svg'
import api from '@/utils/api'
import { useEffect } from 'react'
import Link from 'next/link'

export interface Movie{
  id: string,
  title: string,
  genres: string[],
  IMDB: number,
  synopsis: string,
  poster_path: string

}

interface CardProps{
  movie: Movie
}

export default function Card({movie}:CardProps){
  
  

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
        <Link href={`/summary/${movie.id}`}>View Details</Link>
      </div>
    </div>
  )
} 