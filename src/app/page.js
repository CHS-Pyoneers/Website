"use client";
import Image from 'next/image'
import styles from './page.module.css'
import { motion, useAnimation } from 'framer-motion';
import { RevealAnimation } from "./components/revealAnimation/RevealAnimation"
import Link from 'next/link';
import { signInWithPopup, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth, provider, firebase } from './firebase/config';
import { useEffect, useState, Component } from 'react';
import {getUser, registerUserDoc} from './services/userService'

import {getAnnouncements} from './services/announcementService'
import { useRouter } from 'next/navigation'
import { allowAttendanceLogging, isPresent, logAttendanceFor } from './services/attendanceService';

export default function Home() {
  let [user, setUser] = useState(null)
  let [present, setPresent] = useState(false)
  let [showModal, setShowModal] = useState(false)
  let [showAttendanceBtn, setShowAttendanceBtn] = useState(false)
  let[announcementsArr,setAnnouncementsArr] = useState([]);
  let router = useRouter()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(u => {
      setUser(u)
      if(u) {
        isPresent(u.uid, new Date()).then(p => {
          console.log(p)
          setPresent(p)
        })
      }



    })

    async function fetchAnnouncements() {
      try {
        const fetchedData = await getAnnouncements();
        console.log('Fetched Data:', fetchedData);
        setAnnouncementsArr(fetchedData);
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchAnnouncements();

    allowAttendanceLogging().then(allow => {
      console.log("Attendance Enabled: " + allow)
      setShowAttendanceBtn(allow)
    })

    if(!localStorage.getItem("visited")) {
      setShowModal(true)
      localStorage.setItem("visited", true)
    }
  }, [])

  async function viewCredits() {
    let authUser = user; 
  
    if (authUser == null) {
      authUser = await registerOrLoginUser()
    }
  
    if (authUser) {
      router.push("/clubmember");
    }
  }

  async function registerOrLoginUser() {
    let authUser = user; 
  
    if (authUser == null) {
      try {
        await setPersistence(auth, browserSessionPersistence);
        const result = await signInWithPopup(auth, provider);
        authUser = result.user;
        setUser(authUser);
      } catch (err) {
        console.log(err);
        return; 
      }
    }
  
    if (authUser) {
      let userSnapshot = await getUser(authUser.uid);
  
      if (!userSnapshot.exists) {
        await registerUserDoc(authUser, "student", true);
      }

      setShowModal(false)
    }

    return authUser;
  }

  async function logAttendance() {
    console.log("Logging")
    if(present) return;

    let authUser = user; 
  
    if (authUser == null) {
      authUser = await registerOrLoginUser()
    }
  
    if (authUser) {
      if(!(await isPresent(authUser.uid, new Date()))) {
        await logAttendanceFor(authUser.uid, new Date())
        alert("You have been marked present!")
        setPresent(true)
      } else {
        alert("You already been marked present!")
        setPresent(true)
      }
    }
  }

  function AnnouncementTicker({ announcementsArr }) {
    const controls = useAnimation();
    
  const [textWidth,setWidth] = useState(0);
    useEffect(() => {
      for(let i=0;i<announcementsArr.length-1;i++){
        let theAnnouncement = announcementsArr[i].announcement;
        let length = theAnnouncement.length
        setWidth(textWidth+length)
 
      }
    
     
  
    }, []);
  
  
    const replaceWordWithLink = (text, word, link) => {
      const words = text.split(' ');
      return words.map((w, index) => (
        w === word ? (
          <a key={index} href={link} target="_blank" rel="noopener noreferrer">
            {w}
          </a>
        ) : (
          <span key={index}>{w} </span>
        )
      ));
    };
  
    return (
      <motion.div
        className={styles.announcementBanner}
        initial={{ x: '0%' }} 
        animate={{x:'-95%'}}
        transition={{duration:50,ease: 'linear', 
        repeat: Infinity, 
        repeatType: 'loop',
        delay:0,}} 

      >
        {announcementsArr.map((announcement, index) => (
          <p key={index}>
            📢  {replaceWordWithLink(announcement.announcement, announcement.link[0], announcement.link[1])}
          </p>
        ))}
      </motion.div>
    );
  }
  

  return (
    <main className={styles.main}>
      <div className={styles.announcementBanner}>
        <AnnouncementTicker announcementsArr={announcementsArr}/>
      </div>
      <div className={styles.homecontainer}>
        <Image src="/logo.png" width={100} height={100} sizes='(max-width: 750px) 15rem, 20rem' className={styles.logo} />
        <div>
          {user ? <p><strong>Hello {user.displayName}!</strong></p> : ""}
          <span className={styles.title}>CHS Pyoneers</span>
          <p>Centennial's premier programming club!</p>
          <div className={styles.btngroup}>
            <button className='btn-primary' onClick={viewCredits}>View Dashboard</button>
            <button disabled={!showAttendanceBtn} className={`btn-secondary ${present ? styles.present : ""}`} onClick={logAttendance}>{present ? "You are marked present" :  "Log Attendance"}</button>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.aboutcontainer}>
          <div className={styles.aboutInfoContainer}>
            <RevealAnimation>
              <h1 className={styles.title}>About Us</h1>
            </RevealAnimation>

            <RevealAnimation>
              <p className={styles.text}>CHS Pyoneers is Centennial High School's premier programming club! Since its inception in 2020, the Pyoneers club has rapidly grown to become one of the largest clubs in Centennial. It has hosted the 2021, 2022, 2023, and 2024 Centennial Informatics Tournaments with <font color="green">300 cumulative attendees</font> over the years. Additionally, the club has held Python lessons at five middle and high schools with <font color="green">200 students</font> taught over the years.
              Currently, the club is still rapidly growing and has nearly <font color="green">50 members</font> who play an active part in our community!
              </p>
              <Link href='/about' className={styles.learnMoreBtn}>Learn More!</Link>
            </RevealAnimation>
          </div>

          <div className={styles.pythonImageContainer}>
            <motion.img animate={{
              rotate: 360,
            }}
              transition={{
                repeat: Infinity,
                duration: 9,
                ease: 'linear',
              }} src="/pythonLogo.png" className={styles.logo} />
          </div>
        </div>
      </div>
      <div className={styles.clubPicturesContainer}>
        <p className={styles.modalTitle}>2022-2023</p>
        <div className={styles.clubPictureRow}>
          <img src="/club_picture_half1.jpg" className={styles.clubPicture} />
          <img src="/club_picture_half2.jpg" className={styles.clubPicture} />
          <img src="/club_picture_half3.jpg" className={styles.clubPicture} />
        </div>
        <p className={styles.modalTitle} style={{marginTop: '4rem'}}>2021-2022</p>
        <div className={styles.clubPictureRow}>
          <img src="/club_picture_long1.jpg" className={styles.longClubPicture} />
        </div>
      </div>
      {
        showModal ? (
          <div className={styles.modalContainer}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <h2>Welcome!</h2>
              </div>
              <div className={styles.modalContent}>
                <p>It looks like this is your first time visiting the website. If you do not have an account, click the register button below!</p>
                <button class="btn-primary" onClick={registerOrLoginUser}>Register</button>
                <button class="btn-secondary" onClick={() => setShowModal(false)}>Dismiss</button>
              </div>
            </div>
          </div>
        ) : ""
      }
    </main>
  )
}
