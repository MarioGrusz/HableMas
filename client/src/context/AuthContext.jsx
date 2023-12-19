import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    signOut,
    signInWithRedirect,
    onAuthStateChanged,
    setPersistence,
    browserSessionPersistence,
} from 'firebase/auth';
import { auth } from "../config/firebase.config";
import { createUserInDatabse } from "../api/apiUser";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loadingContext, setLoadingContext] = useState(true);
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
            await setPersistence(auth, browserSessionPersistence);
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
          
          console.error('Sign-in error:', error);
        }
    };
    
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        
        try {
            await setPersistence(auth, browserSessionPersistence);
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
            await setPersistence(auth, browserSessionPersistence);
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
        setPersistence(auth, browserSessionPersistence)
          .then(() => {
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
              if (currentUser) {
                currentUser.getIdToken().then((idToken) => { //put true getIdToken(true)
                  setUser(currentUser);
                  setToken(idToken);
                });
              } else {
                setUser(null);
                setToken(null);
              }
              setLoadingContext(false);
            });
      
            return () => unsubscribe();
          })
          .catch((error) => {

            console.error('Error setting persistence:', error);
          });
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
            {!loadingContext && children}
        </AuthContext.Provider>
    )
};

export const UserAuth = () => {
    return useContext(AuthContext);
};

