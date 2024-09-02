'use client'
import styles from './Component.module.css'
import { useState } from "react";
import Multiselect from 'multiselect-react-dropdown';
import { motion } from "framer-motion";

export default function VerifyModal({ Users, closeModal }) {
  const [allNames, setAllNames] = useState(Object.keys(Users))
  const [selectedUsers, setSelectedUsers] = useState([])
  const [isVerified, setVerified] = useState(true)
  const [role, setRole] = useState('student')

  const handleUpdate = async () => {

    if (selectedUsers.length < 1) {
      alert('please select a user');
      return;
    }

    selectedUsers.map((name) => updatePermissions(Users[name], role, isVerified));

    alert('users updated');

    closeModal();

  }
  const handleCancel = () => {

    setSelectedUsers([]);
    setVerified(true);
    setRole('student')
    closeModal();

  }

  return (

    <motion.div transition={{ duration: .4, delay: .1 }} initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} className={styles.main}>


      <p1 className={styles.title}>Verify/Roles</p1>




      <p1>Users</p1>
      <div className={styles.list}>
        <Multiselect
          isObject={false}



          onKeyPressFn={function noRefCheck() { }}
          onRemove={(event) => {
            setSelectedUsers(event);
            console.log(event)
          }}
          onSearch={function noRefCheck() { }}
          onSelect={(event) => {
            setSelectedUsers(event);
          }}
          options={allNames}

          style={
            {
              option: {
                color: 'black',
              },
              inputField: {
                color: 'white',
              },
            }
          }

        />
      </div>

      <p1>Verified</p1>

      <div className={styles.btnContainer}>

        <button className={isVerified ? 'btn-primary' : 'btn-secondary'} onClick={() => setVerified(true)}>Yes</button>
        <button className={!isVerified ? 'btn-primary' : 'btn-secondary'} onClick={() => setVerified(false)}>No</button>

      </div>

      <p1>Role</p1>

      <div className={styles.btnContainer}>

        <button className={role == 'student' ? 'btn-primary' : 'btn-secondary'} onClick={() => setRole('student')}>Student</button>
        <button className={role == 'instructor' ? 'btn-primary' : 'btn-secondary'} onClick={() => setRole('instructor')}>Instructor</button>
        <button className={role == 'admin' ? 'btn-primary' : 'btn-secondary'} onClick={() => setRole('admin')}>Admin</button>
      </div>


      <button onClick={() => handleCancel()} className='btn-secondary'>Cancel</button>
      <button onClick={() => handleUpdate()} className='btn-primary'>Confirm</button>
    </motion.div>
  )



}