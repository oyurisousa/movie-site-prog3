import { ReactNode } from "react"
import styles from './ButtonNav.module.css'
interface ButtonNavProps{
  children: ReactNode
}

export default function ButtonNav({children}: ButtonNavProps){
  return (
    <button className={styles.buttonNav}>{children}</button>
  )
}