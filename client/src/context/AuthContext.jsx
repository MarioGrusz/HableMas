import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from "../config/firebase.config";
import { createUserInDatabse } from "../api/apiUser";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [snackbar, setSnackbar] = useState({ show: false, message: '', type: '' });

    const showSnackbar = (message, type ) => {
        setSnackbar({ show: true, message, type });
    };
    
    const hideSnackbar = () => {
        setSnackbar({ show: false, message: '', type: '' });
    };

    const createUser = async (email, password, name) => {

        try {

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
       
            if (userCredential) {
                const user = userCredential.user;
                await updateProfile(user, { displayName: name })
                await createUserInDatabse(user);
            }

        } catch (error) {
            console.log(error)
        }
    };


    const signIn = async (email, password) => {
      
        try {
          await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
          
          console.error('Sign-in error:', error);
        }
    };
    
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
        
            if (user) {
                await createUserInDatabse(user);
            }
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };

    const facebookSignIn = async () => {
        const provider = new FacebookAuthProvider();

        try {
            const userCredential = await signInWithRedirect(auth, provider)
            const user = userCredential.user

            if (user) {
                await createUserInDatabse(user);
            }
        } catch (error) {
          
          console.error('Facebook sign-in error:', error);
        }
    };
       

    const logOut = () => {
        signOut(auth)
    };

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            currentUser.getIdToken().then((idToken) => {
              setUser(currentUser);
              setToken(idToken);
            });
          } else {
            setUser(null);
            setToken(null);
          }
        });
    
        return () => unsubscribe();
    }, []);


    const value = {
        createUser,
        signIn,
        googleSignIn,
        facebookSignIn,
        logOut,
        resetPassword,
        user,
        token,
        snackbar,
        setSnackbar,
        showSnackbar,
        hideSnackbar,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

};

export const UserAuth = () => {
    return useContext(AuthContext);
};

