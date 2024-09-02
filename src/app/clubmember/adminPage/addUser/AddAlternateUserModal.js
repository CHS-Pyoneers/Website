'use client'
import styles from './component.module.css'
import { useState } from "react";
import Multiselect from 'multiselect-react-dropdown';
import { motion } from "framer-motion";
import { registerAlternateUser } from '../../../services/userService';

export default function AddAlternateUserModel({ Users, closeModal }) {
    const [allNames, setAllNames] = useState(Object.keys(Users))
    let [newUserName, setNewUserName] = useState("") 
    let [newUserEmail, setNewUserEmail] = useState("")

    const handleUpdate = async () => {
        if(newUserName.trim().length == 0) {
            alert("Enter a name!")
            return
        }
        let exists = false
        allNames.forEach(name => {
            if(name.toLowerCase().trim() == newUserName.toLowerCase().trim()) {
                alert("A user with that name already exists!")
                exists = true
            }
        })
        if(exists) return

        await registerAlternateUser(newUserName, newUserEmail, "student", true)
        alert('Alternate User Registered');

        closeModal();

    }
    const handleCancel = () => {
        closeModal();
    }

    return (

        <motion.div transition={{ duration: .4, delay: .1 }} initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} className={styles.main}>


            <p1 className={styles.title}>Alternate User Registration</p1>
            <p1>User</p1>
            <div className={styles.list}>
                <input type="text" placeholder='Full name of user' onChange={(e) => setNewUserName(e.target.value)} value={newUserName}></input>
                <input type="text" placeholder='Email (optional)' onChange={(e) => setNewUserEmail(e.target.value)} value={newUserEmail}></input>
            </div>

            <button onClick={() => handleCancel()} className='btn-secondary'>Cancel</button>
            <button onClick={() => handleUpdate()} className='btn-primary'>Create User</button>
        </motion.div>
    )



}