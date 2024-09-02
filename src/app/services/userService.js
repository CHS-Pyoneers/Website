import { firebase } from '../firebase/config';
import { randomUUID } from 'crypto';

async function getUser(id) {
    const userRef = firebase.firestore().collection('users').doc(id);
    const userSnapshot = await userRef.get();

    return userSnapshot;
}

async function registerUserDoc(user, role, verified) {
    const userRef = firebase.firestore().collection('users').doc(user.uid);
    let signUpDate = new Date();

    let date = signUpDate.getDate();
    let month = signUpDate.getMonth() + 1;
    let year = signUpDate.getFullYear();

    let finalDate = month + "-" + date + "-" + year;
    const newUserDocData = {
        displayName: user.displayName,
        email: user.email,
        credits: 1,
        verified: verified,
        creditsBreakdown: [{ credits: 1, for: "Website signup", date: finalDate },],
        role: role,
    };

    await userRef.set(newUserDocData)

    await firebase.firestore().collection('users').doc('allUsers').update(
        {
            [user.displayName]:user.uid

        }
    )
    return newUserDocData;
}

async function registerAlternateUser(name, email, role, verified) {
    let id = "alt_" + name.toLowerCase().replace(" ", "_") + (Math.round(Math.random()*1000));
    const userRef = firebase.firestore().collection('users').doc(id);
    let signUpDate = new Date();

    let date = signUpDate.getDate();
    let month = signUpDate.getMonth() + 1;
    let year = signUpDate.getFullYear();

    let finalDate = month + "-" + date + "-" + year;
    const newUserDocData = {
        displayName: name,
        email: email,
        credits: 1,
        verified: verified,
        creditsBreakdown: [{ credits: 1, for: "Website signup", date: finalDate },],
        role: role,
    };

    console.log(id)
    await userRef.set(newUserDocData)

    await firebase.firestore().collection('users').doc('allUsers').update(
        {
            [name]:id

        }
    )
    return newUserDocData;
}

async function getAllUser(){
    const userRef = firebase.firestore().collection('users').doc('allUsers');
    const userSnapshot = await userRef.get();

    return userSnapshot.data();
}

async function updateCreds(uid,addCredits,reason) {
    const userRef = firebase.firestore().collection('users').doc(uid);

    let curDate = new Date();

    let date = curDate.getDate();
    let month = curDate.getMonth() + 1;
    let year = curDate.getFullYear();

    let finalDate = month + "-" + date + "-" + year;

    let breakDown = [
        { credits: addCredits, for: reason, date: finalDate }
    ];

  
    await userRef.update({
        credits: firebase.firestore.FieldValue.increment(addCredits),
        creditsBreakdown: firebase.firestore.FieldValue.arrayUnion(...breakDown)
    });

    return; 
    
}

async function updatePermissions(uid,role,verified) {
    const userRef = firebase.firestore().collection('users').doc(uid);

    await userRef.update({
        role:role,
        verified:verified,
    });

    
    
}

export { getUser, registerUserDoc, updateCreds,getAllUser,updatePermissions, registerAlternateUser }