'use client'

import Image from 'next/image'
import styles from './Card.module.css'
import banner from '../../../public/test.png'
import ButtonCategory from '../Buttons/ButtonCategory'
import imdb from '../../../public/imdb.svg'
import api from '@/utils/api'
import { useEffect } from 'react'
import { Space_Mono } from 'next/font/google'

interface Movie{
  id: string,
  title: string,
  genres: string[],
  IMDB: number,
  synopsis: string,
  director: string,
  cast: string[]
}

const movies = async ()=>{
  const data = await api.get('/discover/movie')
    .then(response => response.data)
    .catch(err=> console.log(err))
  
  console.log(data)
}

export default function Details(){
  const movie: Movie = {
    id: '1',
    title: 'RRR',
    genres: [
      'Action',
      'Fiction',
      'Golden Global Winner'
    ],
    IMDB: 9.9,
    synopsis: 'It centers around two real-life Indian revolutionaries, Alluri Sitarama Raju (Charan) and Komaram Bheem (Rama Rao), their fictional friendship and their fight against the British Raj.',
    director: 'S.S. Rajamouli',
    cast: [
        'Jr NTR,',
        'Ram Charan,',
        'Alia Bhatt'
    ]

  }
  
  useEffect(()=>{
    movies()
  })

  return (
    <div className={styles.card}>
      <Image
        src={banner}
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
        <span>Director: {movie.director}</span>
        <div className={styles.casts}>
            <span>Cast:</span>
            <div className={styles.cast}>
            {movie.cast.map((cast,index)=>{
            return (
              <p key={`cast-${index}`}>{cast}</p>
            )})}
            </div>
        </div>
      </div>
    </div>
  )
} 