import { ReactNode } from "react"
import styles from './ButtonCategory.module.css'
interface ButtonCategoryProps{
  children: ReactNode
  color?: string
}

export default function ButtonCategory({children, color="transparent"}: ButtonCategoryProps) {
  return (
    <button className={styles.buttonCategory} style={{backgroundColor: `${color}`}}>{children}</button>
  ) 
} 