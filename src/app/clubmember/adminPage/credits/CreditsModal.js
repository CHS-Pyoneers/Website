'use client'
import styles from './Component.module.css'
import { useEffect, useState } from "react";
import Multiselect from 'multiselect-react-dropdown';
import { motion } from "framer-motion";
import { RevealAnimation } from '../../../components/revealAnimation/RevealAnimation';
import { getAllUser, updateCreds, getUser } from '../../../services/userService'
import { color } from 'framer-motion';
export default function CreditsModal({ Users, closeModal }) {
  const [allNames, setAllNames] = useState(Object.keys(Users))
  const [selectedUsers, setSelectedUsers] = useState([])
  const [amount, setAmount] = useState(0)
  const [reason, setReason] = useState('blank')
  const [raffling, setRaffling] = useState(false)
  const handleUpdate = async () => {

    if (selectedUsers.length < 1) {
      alert('please select a user');
      return;
    }


    if (reason.length < 1) {
      alert('please enter a valid reason')
      return
    }

    if (amount.trim() == "") {
      alert('please enter a valid ammount')
      return
    }

        selectedUsers.map((name)=>updateCreds(Users[name],parseFloat(amount),reason));
        alert('users updated');

    closeModal();

  }
  const handleCancel = () => {

    setSelectedUsers([]);
    setReason('blank');
    setAmount(0)
    closeModal();

  }

  async function raffle() {
    setRaffling(true)
    let users = await getAllUser();
    let creds = await fetchCredits(users);

    let hat = []

    for (let user of creds) {
      for (var i = 0; i < user.credits; i++) {
        hat.push(user);
      }
    }

    let pick = hat[Math.floor(Math.random() * hat.length)];
    setRaffling(false);
    alert("Raffle winner is " + pick.name + " with " + pick.credits + " credits!");
  }

  async function fetchCredits(users) {
    let userCredits = []
    for (const [name, id] of Object.entries(users)) {
      let userData = (await getUser(id)).data();
      if (userData != undefined) {
        userCredits.push({
          name: name,
          credits: calcCredits(userData)
        })
      }

    }

    return userCredits.sort((a, b) => b.credits - a.credits);
  }

  function calcCredits(user) {
    const creds = user.credits;
    return creds
  }



  return (

    <motion.div transition={{ duration: .4, delay: .1 }} initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} className={styles.main}>


      <p1 className={styles.title}>Manage Credits</p1>

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

      <p1>Amount</p1>

      <div className={styles.btnContainer}>

        <input
          className={styles.input}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

      </div>

      <p1>Reason</p1>

      <div className={styles.btnContainer}>

        <textarea
          className={styles.inputReason}

          onChange={(e) => setReason(e.target.value)}
        />
      </div>

      <button onClick={() => raffle()} disabled={raffling} className='btn-secondary'>{(!raffling) ? "Raffle Credits" : "Doing some magic..."}</button>
      <button onClick={() => handleCancel()} className='btn-secondary'>Cancel</button>
      <button onClick={() => handleUpdate()} className='btn-primary'>Confirm</button>
    </motion.div>

  )
}
