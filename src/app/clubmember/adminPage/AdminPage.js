'use client'
import styles from './Component.module.css'
import { useEffect, useState } from "react";
import { firebase } from '../../firebase/config';
import { getAllUser, updateCreds } from '../../services/userService'
import VerifyModal from './verify/VerifyModal'
import CreditsModal from './credits/CreditsModal'
import AttendanceModal from "./attendance/AttendanceModal"
import AnnouncementsModal from "./announcements/AnnouncementsModal"
import AddAlternateUserModal from "./addUser/AddAlternateUserModal"
export default function AdminPage({ user, userDoc }) {

  const [allUsers, setAllUsers] = useState({})
  const[currentModal,setCurrentModal] = useState("none")

  useEffect(() => {
    getUsers();
    console.log(allUsers)
  },[])

  const getUsers = async () => {
    setAllUsers(await getAllUser());
  }

  const closeModal = () =>{
setCurrentModal('none')
  }
  return (
    <div className={styles.main}>

      <div className={styles.Container}>
        <div className={styles.verifyIcon}></div>
        <button onClick={()=>setCurrentModal('verify')} className='btn-primary'>Verify/Roles</button>
      </div>


      <div className={styles.Container}>

        <div className={styles.creditIcon}></div>
        <button onClick={()=>setCurrentModal('credits')}  className='btn-primary'>Manage Credits</button>

      </div>



      <div className={styles.Container}>
        <div className={styles.verifyIcon}></div>
        <button className='btn-primary' onClick={()=>setCurrentModal("attendance")}>Manage Attendance</button>
      </div>

      <div className={styles.Container}>
        <div className={styles.verifyIcon}></div>
        <button className='btn-primary' onClick={()=>setCurrentModal("announcements")}>Announcements</button>
      </div>

      <div className={styles.Container}>
        <div className={styles.verifyIcon}></div>
        <button className='btn-primary' onClick={()=>setCurrentModal("newUser")}>Alternate User Registration</button>
      </div>


      {currentModal=="verify"? <VerifyModal closeModal={closeModal} Users={allUsers}/> : <></>}
      {currentModal=="credits"? <CreditsModal closeModal={closeModal} Users={allUsers}/> : <></>}

      
      {currentModal == "attendance" ? <AttendanceModal closeModal={closeModal} Users={allUsers}></AttendanceModal> : ""}
      {currentModal == "announcements" ? <AnnouncementsModal closeModal={closeModal} Users={allUsers}></AnnouncementsModal> : ""}
      {currentModal == "newUser" ? <AddAlternateUserModal closeModal={closeModal} Users={allUsers}></AddAlternateUserModal> : ""}
    </div>


  )

}