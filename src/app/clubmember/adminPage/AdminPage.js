'use client'
import styles from './Component.module.css'
import { useEffect, useState } from "react";
import { firebase } from '../../firebase/config';
import { getAllUser, updateCreds, resetAllCredits } from '../../services/userService'
import VerifyModal from './verify/VerifyModal'
import CreditsModal from './credits/CreditsModal'
import AttendanceModal from "./attendance/AttendanceModal"
import AnnouncementsModal from "./announcements/AnnouncementsModal"
import AddAlternateUserModal from "./addUser/AddAlternateUserModal"

export default function AdminPage({ user, userDoc }) {
  const [allUsers, setAllUsers] = useState({})
  const [isResetting, setIsResetting] = useState(false)
  const [currentModal, setCurrentModal] = useState("none")

  useEffect(() => {
    getUsers();
    console.log(allUsers)
  }, [])

  const getUsers = async () => {
    setAllUsers(await getAllUser());
  }

  const resetAllCreditsHandler = async () => {
    if (!confirm("Reset all users' credits?\nTHIS ACTION CANNOT BE UNDONE.")) return;
    setIsResetting(true);
    try {
      await resetAllCredits();
      alert("Reset complete.");
      getUsers();
    } catch (e) {
      console.error("Admin resetAllCreditsHandler failed", e);
      alert("Reset failed. See console.");
    } finally { //execute once done
      setIsResetting(false);
    }
  }

  const closeModal = () => {
    setCurrentModal('none')
  }
  return (
    <div className={styles.main}>
      <div className={styles.Container}>
        <div className={styles.verifyIcon}></div>
        <button onClick={() => setCurrentModal('verify')} className='btn-primary'>Verify/Roles</button>
      </div>
      <div className={styles.Container}>
        <div className={styles.creditIcon}></div>
        <button onClick={() => setCurrentModal('credits')} className='btn-primary'>Manage Credits</button>
      </div>
      <div className={styles.Container}>
        <div className={styles.verifyIcon}></div>
        <button className='btn-primary' onClick={() => setCurrentModal("attendance")}>Manage Attendance</button>
      </div>
      <div className={styles.Container}>
        <div className={styles.verifyIcon}></div>
        <button className='btn-primary' onClick={() => setCurrentModal("announcements")}>Announcements</button>
      </div>
      <div className={styles.Container}>
        <div className={styles.verifyIcon}></div>
        <button className='btn-primary' onClick={() => setCurrentModal("newUser")}>Alternate User Registration</button>
      </div>
      <div className={styles.Container}>
        <div className={styles.creditIcon}></div>
        <button className='btn-primary' disabled={isResetting} onClick={resetAllCreditsHandler}>{isResetting ? 'Resetting...' : 'Reset All Credits'}</button>
      </div>


      {currentModal == "verify" ? <VerifyModal closeModal={closeModal} Users={allUsers} /> : <></>}
      {currentModal == "credits" ? <CreditsModal closeModal={closeModal} Users={allUsers} /> : <></>}
      {currentModal == "attendance" ? <AttendanceModal closeModal={closeModal} Users={allUsers}></AttendanceModal> : ""}
      {currentModal == "announcements" ? <AnnouncementsModal closeModal={closeModal} Users={allUsers}></AnnouncementsModal> : ""}
      {currentModal == "newUser" ? <AddAlternateUserModal closeModal={closeModal} Users={allUsers}></AddAlternateUserModal> : ""}
    </div>
  )
}