import React, { createContext, useContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.config';

const AUTH_CONTEXT = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState();
    const googleProvider = new GoogleAuthProvider();

    const signUpUsingEmail = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUsingEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInUsingGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const signOutFromApp = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                setUser(currentUser)
            }
            else {
                setUser(null)
            }
        })

        return () => unsubscribe();
    }, []);
    const authInfo = {
        user,
        error,
        setError,
        signUpUsingEmail,
        signInUsingEmail,
        signInUsingGoogle,
        signOutFromApp
    };
    return (
        <AUTH_CONTEXT.Provider value={authInfo}>
            {children}
        </AUTH_CONTEXT.Provider>
    );
};

export const useAuthInfo = () => {
    return useContext(AUTH_CONTEXT);
}

export default AuthProvider;