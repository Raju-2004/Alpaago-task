import React, { useContext, useEffect, useState } from 'react'
import { onAuthStateChanged ,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import { auth } from '../firebase'
const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}



export const AuthProvider = ({children}) => {
    const [currentUser,setCurrentUser] = useState()
    const [loading,setLoading] = useState(true)
    function signup(email,password){
        return createUserWithEmailAndPassword(auth,email,password);
    }
    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    },[])
    const value = {
        currentUser,
        signup,
        login
    }
  return (
    <AuthContext.Provider value={value}>
        {!loading &&  children}
    </AuthContext.Provider>
  )
}


