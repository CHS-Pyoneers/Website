"use client"
import { useState, useEffect } from "react"
import {getAllUser, getUser} from "../services/userService"
import styles from "./page.module.css"

export default function Page() {
    let [leaderboard, setLeaderboard] = useState([])

    useEffect(() => {
        if(leaderboard.length == 0) {
            getAllUser().then(users => {
                fetchCredits(users).then(lb => {
                    setLeaderboard(lb)
                })
            })
        }
    }, [])

    function calcCredits(user) {
        const creds = user.credits;
        return creds
    }

    async function fetchCredits(users) {
        let userCredits = []
        for(const [name, id] of Object.entries(users)) {
            let userData = (await getUser(id)).data();
            console.log(userData)
            console.log(id)
            if(userData!=undefined){
                
                userCredits.push({
                    name: name,
                    credits: calcCredits(userData)
                })
            }
            
        }

        return userCredits.sort((a, b) => b.credits - a.credits);
    }

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.headertext}>Credit Leaderboard</h1>
                </div>
                <div className={styles.leaderboard}>
                {
                    leaderboard.map((entry, index) => 
                        <p key={index}>{(index+1) == 1 ? "🥇" : (index+1) == 2 ? "🥈" : (index+1) == 3 ? "🥉" : `${index+1}. `} {entry.name} - {calcCredits(entry)} credits</p>
                    )
                }
                </div>
                
            </div>
        </main>
    )
}