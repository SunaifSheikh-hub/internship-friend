import { onSnapshot, query, collection, where } from 'firebase/firestore';
import { db, auth } from '../Firebase';
import React from 'react'

const Otheruser = () => {
    let uid = ''
    auth.onAuthStateChanged((user) => {
        uid = user.uid
        console.log(uid);
    })

    const q = query(collection(db, "users"), where("uid", "==", uid))
    onSnapshot(q, (snapshot) => {
        console.log(snapshot)
    })





    return (
        <div>

        </div>
    )
}

export default Otheruser;
