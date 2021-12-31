import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContext'
import { Route, Routes } from "react-router";
import SignUp from '../SignUp';
import Login from "../LogIn.js";
import Home from "../Home";
import Setting from "../Setting";
import Dashboard from "../Dashboard";
import Searchbtn from "../Searchbtn";
import Error from '../Error';
import Search from "../Search/Search"
import Otheruser from '../OthersUser/Otheruser';

const IfLog = () => {
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='setting' element={<Setting />} />
            <Route exact path='dashboard' element={<Dashboard />} />
            <Route exact path='searchbtn' element={<Searchbtn />} />
            <Route exact path='search' element={<Search />} />
            <Route exact path='/:uid' element={<Otheruser />} />
            <Route path='*' element={<Error />} />
        </Routes>

    )
}

const IfNotLog = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='*' element={<Error />} />
        </Routes>

    )
}

const AuthHandler = () => {
    const authCtx = useContext(AuthContext)
    return authCtx.isLoggedIn ? <IfLog /> : <IfNotLog />
}

export default AuthHandler
