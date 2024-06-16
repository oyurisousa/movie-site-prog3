import Image from 'next/image'
import logo from '../../../public/logo.png'
import styles from './Header.module.css'
import ButtonNav from './ButtonNav'
import ButtonStandard from '../Buttons/ButtonStandard'
import Link from 'next/link'

export default function Header(){
  return (
    <header className={styles.header}>
      <Image src={logo} alt='as'/>
      
      <nav className={styles.nav}>
        <Link href="/">
          <ButtonNav>Films</ButtonNav>
        </Link>
        <ButtonNav>Watchlist</ButtonNav>
        <ButtonStandard color='#FF9800'>Login</ButtonStandard>
      </nav>
      
    </header>
  )
} 