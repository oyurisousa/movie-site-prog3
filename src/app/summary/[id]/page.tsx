import styles from './Details.module.css'
import Details from "@/components/Movie/Details";

export default function DetailsMovie({params} : any){
  return (
    <div className={styles.details}><Details/></div>
  )
}