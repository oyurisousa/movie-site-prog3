import styles from './Serie.module.css'
import Image from "next/image"
import ButtonCategory from "../Buttons/ButtonCategory"
import imdb from '../../../public/imdb.svg'
import Link from "next/link"

interface SerieProps {
  serie: Serie
}


export default function SerieCard({ serie }: SerieProps) {
  return (
    <div className={styles.card}>
      <Image
        src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
        alt=''
        width={150}
        height={300}
      />

      <div className={styles.cardInfo}>
        <span className={styles.title}>{serie.title}</span>
        <div className={styles.genre}>
          {serie.genres.map((genre, index) => {
            return (
              <ButtonCategory key={`genre-${index}`}>{genre}</ButtonCategory>
            )
          })}

        </div>
        <div className={styles.imdb}>
          <Image src={imdb} alt='' />
          <div className={styles.star}>
            {serie.IMDB}
            ★
          </div>

        </div>
        <p className={styles.synopsis}>{serie.synopsis}</p>
        <Link className={styles.viewDetails} href={`/series/${serie.id}`}>View Details</Link>
      </div>
    </div>
    // <div className={styles.card}>
    //   <Image
    //     src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
    //     alt=''
    //     width={150}
    //     height={235}
    //   />

    //   <div className={styles.cardInfo}>
    //     <span className={styles.name}>{serie.name}</span>
    //     <div className={styles.genre}>
    //       {serie.genres.map((genre, index) => {
    //         return (
    //           <ButtonCategory key={`genre-${index}`}>{genre}</ButtonCategory>
    //         )
    //       })}
    //     </div>
    //     <div className={styles.imdb}>
    //       <Image src={imdb} alt='' />
    //       <div className={styles.star}>
    //         {serie.IMDB}
    //         ★
    //       </div>

    //     </div>
    //     <Link className={styles.viewDetails} href={`/series/${serie.id}`}>View Details</Link>
    //   </div>
    // </div>
  )
}