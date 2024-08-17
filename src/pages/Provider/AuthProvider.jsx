import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../../Firebase/Firebase.config";
import useAxiosPublic from "../../Hook/AxiosPublic/useAxiosPublic";


export const AuthContext = createContext(null);
 
const AuthProvider = ({children}) => {
    const [user, setuser] = useState(null);
    console.log(user);
      const AxiosPublic = useAxiosPublic()
    const [loading, setLoading] = useState(true);
    //register
  
    const Creatuser = (email, passowrd) => {
      setLoading(true)



      return createUserWithEmailAndPassword(auth, email, passowrd);
    }
    // ////// updated
  
    const updatedUserProfile = (name, image) => {           
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: image
      }).then(() => {
                    
      }).catch((error) => {
        console.error(error) 
      });
    }
                                        
    // //////////////////////////////////////////////
    const login = (email, password) => {
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, password)                 
    }
  
    // /////////////////////////////////////////////
    const LogOut = () => {
  
      return signOut(auth)
    }
  
    // Social provider 
    const GoogleProvider = new GoogleAuthProvider();
    
  
    const googleLogin = () => {
      return signInWithPopup(auth, GoogleProvider)
    }
    useEffect(() => {
      const Unsubscribe = onAuthStateChanged(auth, (Cuuretusers) => {
       
        setuser(Cuuretusers)

        if (Cuuretusers) {
          // get token and store client
                    const userInfo = { email: Cuuretusers.email };
                    AxiosPublic.post('/jwt', userInfo)
                        .then(res => {
                            if (res.data.token) {
                                localStorage.setItem('token', res.data.token);
                                setLoading(false)
                            }
                        })
                }
                else {
                    localStorage.removeItem('token');
                  setLoading(false)
                }

      });
      return () => {
        Unsubscribe()
      }
    },
      [])
  
    const AuthInfo = {
      user,
      loading,
      Creatuser,
      login,
      LogOut,
      googleLogin,
      updatedUserProfile,
     
    
    }
    return (
        <AuthContext.Provider value={AuthInfo}  >

        {children}                           
  
      </AuthContext.Provider>
    );
};

export default AuthProvider;