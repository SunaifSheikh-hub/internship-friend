import React, { createContext } from 'react'

const AuthContext = createContext({
    isLoggedIn: false,
    setToogle: () => { }
    // onLogout: () => { },
    // open: false,
})

export default AuthContext;
