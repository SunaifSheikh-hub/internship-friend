import React, { useState } from 'react'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../Firebase';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [searchInput, setsearchInput] = useState("");
    const [suggestion, setsuggestion] = useState([])

    const searchUser = (e) => {
        setsearchInput(e.target.value)
        console.log("run search", e.target.value, searchInput)

        // const q = query(collection(db, "users"), where("username", "==", searchInput));
        const q = query(
            collection(db, "users"),
            where("username", ">=", searchInput.toLowerCase()),
            where("username", "<=", searchInput.toLowerCase() + "\uf8ff")
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const UserArr = [];
            querySnapshot.forEach((doc) => {
                UserArr.push(doc.data());
                console.log(doc.data());
            });
            setsuggestion(UserArr)
            console.log("usersData ", UserArr);
        });
    }
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: 'column' }}>
            <input size="50" type="search" value={searchInput} onChange={searchUser} />
            {/* <button onClick={searchUser}>Check</button> */}
            <div className="suggestions">
                {
                    suggestion.map((suggesData) => {
                        return (
                            <div className="suggestion" id={suggesData.uid} onlick={(e) => {
                                const uid = e.target.id
                                navigate(`/${uid}`)
                            }} style={{ cursor: 'pointer' }}>{suggesData.username}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Search;
