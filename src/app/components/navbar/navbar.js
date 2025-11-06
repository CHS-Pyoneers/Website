"use client"; // next js kinda weird need to add this.
import styles from './component.module.css'
import Link from 'next/link';

export default function NavBar() {

  const scrollToComponent = (id) => {
    const targetComponent = document.getElementById(id); // Adjust the ID as needed
    if (targetComponent) {
      targetComponent.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <nav className={styles.navbar}>
      <Link href='/' className={styles.name}><span>&gt;</span>Pyoneers</Link>
      <Link className={styles.navlink} href='/clubmember'>Dashboard</Link>
      <Link className={styles.navlink} href='/about'>About</Link>
      <Link className={styles.navlink} rel="noreferrer noopener" target="_blank" href='https://cint.info'>CInT</Link>
      <Link className={styles.navlink} href='/contact'>Contact</Link>
      <Link className={styles.navlink} href="/leaderboard">Leaderboard</Link>
    </nav>
  )
}
