import { ReactNode } from "react"
import styles from './ButtonStandard.module.css'
interface ButtonStandardProps{
  children: ReactNode
  color?: string
}

export default function ButtonStandard({children, color="transparent"} : ButtonStandardProps){
  return (
    <button className={styles.buttonStandard} style={{backgroundColor: `${color}`}}>{children}</button>
  ) 
} 