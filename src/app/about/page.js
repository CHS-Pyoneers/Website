"use client";
import Image from 'next/image'
import inherited_styles from '../page.module.css'
import styles from './page.module.css'
import { motion } from 'framer-motion';
import { RevealAnimation } from "../components/revealAnimation/RevealAnimation"
import Link from 'next/link';

export default function Home() {
  return (
    <main className={inherited_styles.main}>
      <div className={styles.content}>

        <div className={styles.aboutcontainer}>
          <div className={inherited_styles.aboutInfoContainer}>
            <RevealAnimation>
              <h1 className={inherited_styles.title}>What We Do</h1>
            </RevealAnimation>
            <RevealAnimation>
              <p className={inherited_styles.text}>
                The Pyoneers Club leads two main efforts: teaching and organizing competitions.
                We currently lead beginner and advanced lessons at the following schools:
                <br/><br/>&nbsp;{' > '}Burleigh Manor Middle School
                <br/>&nbsp;{' > '}Dunloggin Middle School
                <br/>&nbsp;{' > '}Centennial High School
                <br/><br/>and have been doing so since 2020! Topics involving anything from basic print statements to advanced object-oriented principles have been covered in these lessons. Alongside that, we have organized three Centennial Informatics Tournaments (CInTs), where contestants solve USACO-esque problems for cash prizes.
              </p>
            </RevealAnimation>
          </div>
          <div className={inherited_styles.pythonImageContainer}>
            <img src="/logo.png" className={inherited_styles.logo} />
          </div>
        </div>

          <div className={inherited_styles.aboutInfoContainer}>
            <RevealAnimation>
              <h1 className={inherited_styles.title} style={{textAlign: 'center'}}>Meet the Board</h1>
            </RevealAnimation>
            <RevealAnimation> 
            <div className={styles.boardContainer}>
              <div className={styles.boardMember}>
                <img src="/aryan_headshot.jpg" alt="Board Member" className={styles.boardImage} />
                <h2 className={styles.boardName}>Aryan Shwarma</h2>
                <p className={styles.boardPosition}>President</p>
                <p className={styles.boardBio}>
                Aryan is a senior at Centennial High School and is currently the president of CHS Pyoneers. He is also part of Centennial's AI Club, CyberPatriot, Competitive Coding Club, and Math Team. Outside of school, Aryan enjoys competing in Capture The Flag (CTF) tournaments with friends, going to overnight hackathons, and playing some combination of basketball and IO games.
                </p>
              </div>
              <div className={styles.boardMember}>
                <img src="/jaden_headshot.png" alt="Board Member" className={styles.boardImage} />
                <h2 className={styles.boardName}>Jaden Li</h2>
                <p className={styles.boardPosition}>Vice President</p>
                <p className={styles.boardBio}>
                Jaden is a senior at Centennial High School, where he is vice president of CHS Pyoneers. He is also a captain of the CHS Math Team, secretary of the National Math Honor Society, and a member of the varsity tennis team. In his free time, he enjoys improving his programming and math skills, playing the cello in various youth orchestras, playing tennis with friends, and playing videogames on his switch (Mario Kart is his specialty).
                </p>
              </div>
              <div className={styles.boardMember}>
                <img src="/victor_headshot.jpg" alt="Board Member" className={styles.boardImage} />
                <h2 className={styles.boardName}>Victor Liu</h2>
                <p className={styles.boardPosition}>Vice President</p>
                <p className={styles.boardBio}>
                Victor is a senior at Centennial High School. He is current the vice-president of the CHS Pyoneers club but also enjoys participating in other clubs including Math Team and CyberPatriot. In his free time, Victor often plays tennis with his friends, participates in hackathons, as well as plays the violin.
                </p>
              </div>
              <div className={styles.boardMember}>
                <img src="/joshua_headshot.png" alt="Board Member" className={styles.boardImage} />
                <h2 className={styles.boardName}>Joshua Oh</h2>
                <p className={styles.boardPosition}>Secretary</p>
                <p className={styles.boardBio}>
                Joshua is a junior at Centennial High School, where is he the secretary of CHS Pyoneers. He is also the vice president of French Club and Habitat for Humanity. In his free time, he enjoys programming, listening to music, and running with his friends.
                </p>
              </div>

              <div className={styles.boardMember}>
                <img src="/rana_headshot.png" alt="Board Member" className={styles.boardImage} />
                <h2 className={styles.boardName}>Rana Cherukuri</h2>
                <p className={styles.boardPosition}>PR Manager</p>
                <p className={styles.boardBio}>
                Rana is a junior at Centennial High School, where he is the PR Manager of CHS Pyoneers. He is also president of the Java Development Club, and a member of the National English Honor Society, and a current Life Scout in his Scouts troop. In his free time, he enjoys programming, playing Pokémon, camping, and watching Marvel.
                </p>
              </div>
              <div className={styles.boardMember}>
                <img src="/lak_headshot.png" alt="Board Member" className={styles.boardImage} />
                <h2 className={styles.boardName}>Lakshith Senthil</h2>
                <p className={styles.boardPosition}>Member at Large</p>
                <p className={styles.boardBio}>
                Lakshith is a sophomore at Centennial High School, where he is the Member at Large of CHS Pyoneers. He was also in the Class Board of 2027 and part of the Humanities board. In his free time, he enjoys playing Brawl Stars, programming, and walking outside. 
                </p>
              </div>
              <div className={styles.boardMember}>
                <img src="/daud_headshot.png" alt="Board Member" className={styles.boardImage} />
                <h2 className={styles.boardName}>Daud Idrees</h2>
                <p className={styles.boardPosition}>Webmaster</p>
                <p className={styles.boardBio}>
                Daud is a senior at Centennial High School, where he is a part of the education committee and Webmaster for Pyoneers. He is also a part of other clubs such as AI Club. In his free time he likes to play video games, watch different shows, code, and sleep.
                </p>
              </div>
              
            </div>
            </RevealAnimation>
          </div>

        <div className={styles.aboutcontainer}>
          <div className={inherited_styles.committee}>
            <RevealAnimation>
              <h1 className={inherited_styles.title} style={{textAlign: 'center'}}>Education Committee</h1>
            </RevealAnimation>
            <RevealAnimation>
              <p className={inherited_styles.text} style={{textAlign: 'center'}}>
                The education committee is in charge of lessons! They teach both virtually and in-person at our schools. All instructors are qualified to teach beginner and advanced lessons, and they pass interviews before becoming teachers. Applications to join the committee open near the first or second month of the school year.
              </p>
            </RevealAnimation>
          </div>
          <div className={inherited_styles.committee}>
            <RevealAnimation>
              <h1 className={inherited_styles.title} style={{textAlign: 'center'}}>Tournament Committee</h1>
            </RevealAnimation>
            <RevealAnimation>
              <p className={inherited_styles.text} style={{textAlign: 'center'}}>
              The tournament committee handles everything CInT! It's split into two portions: the marketing team and the informatics team. Marketing team handles sponsorships, while the informatics team writes problems for competition day. Applications to join the committee open near the first or second month of the school year.
              </p>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </main>
  )
}
