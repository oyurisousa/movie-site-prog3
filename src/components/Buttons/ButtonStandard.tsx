import { ReactNode } from "react"
import styles from './ButtonStandard.module.css'
interface ButtonStandardProps{
  children: ReactNode
  color?: string
  border?: boolean
}

export default function ButtonStandard({children, color="transparent", border=false} : ButtonStandardProps){
  return (
    <button className={styles.buttonStandard} style={{backgroundColor: `${color}`, border: `${border ? '1px solid #9e9e9e' : ''} `}}>{children}</button>
  ) 
} 