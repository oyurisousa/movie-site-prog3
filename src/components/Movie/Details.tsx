'use client'

import Image from 'next/image'
import styles from './Card.module.css'
import banner from '../../../public/test.png'
import ButtonCategory from '../Buttons/ButtonCategory'
import imdb from '../../../public/imdb.svg'
import api from '@/utils/api'
import { useEffect } from 'react'


interface Movie{
  id: string,
  title: string,
  genres: string[],
  IMDB: number,
  synopsis: string,
  director: string,
  cast: string[]
}

interface DetailsProps{
  params: {
    id: string
  }
}


const getMovieById = async (id: number | string) => {
  try {
    const response = await api.get(`/movie/${id}`);
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default function Details({params}: DetailsProps){
  // const movie: Movie = {
  //   id: '1',
  //   title: 'RRR',
  //   genres: [
  //     'Action',
  //     'Fiction',
  //     'Golden Global Winner'
  //   ],
  //   IMDB: 9.9,
  //   synopsis: 'It centers around two real-life Indian revolutionaries, Alluri Sitarama Raju (Charan) and Komaram Bheem (Rama Rao), their fictional friendship and their fight against the British Raj.',
  //   director: 'S.S. Rajamouli',
  //   cast: [
  //       'Jr NTR,',
  //       'Ram Charan,',
  //       'Alia Bhatt'
  //   ]

  // }
  let movie
  useEffect(()=>{
    movie = ()=>{
    return getMovieById(params.id)
    }
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
              <ButtonCategory key={`genre-${index}`}>{genre.name}</ButtonCategory>
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
            <span>Cast: &nbsp;</span>
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