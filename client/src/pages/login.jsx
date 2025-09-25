import React, { useState, useEffect } from "react";
import {FcGoogle} from "react-icons/fc";
import Image from "next/image";
import styles from "../styles/AnimatedText.module.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";

function Login() {
  const text = "M-Connecta";
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPlaying(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const router  = useRouter()

  const [{}, dispatch] = useStateProvider();

  const handleLogin = async() => {
    const provider = new GoogleAuthProvider();
    const {user: {displayName:name, email, photoURL:profileImage}} = await signInWithPopup(firebaseAuth, provider);
    try {
      if (email){
        const {data} = await axios.post(CHECK_USER_ROUTE, {email});

        // console.log({data})


        if (!data.status) {
          dispatch ({
            type: reducerCases.SET_NEW_USER,
            newUser : true
          });

          dispatch({
            type : reducerCases.SET_USER_INFO,
            userInfo: {
              name, 
              email, 
              profileImage, 
              status:"",
            },
          });
          router.push("/onboarding")
        }
      }
    } catch(err){
      console.log(err)
    }
  }

  return (
    <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
      <div className="flex items-center justify-center gap-2 text-white">
        {playing ? (
          <Image src="/logo.gif" alt="ChatApplication" height={300} width={300} unoptimized />
        ) : (
          <Image src="/logo.png" alt="ChatApplication" height={300} width={300} />
        )}
        <h1 className={`${styles.animatedText} text-7xl font-bold`}>
          {text.split("").map((char, index) => (
            <span key={index} style={{ animationDelay: `${index * 0.25}s` }}>
              {char}
            </span>
          ))}
        </h1>
      </div>
        <button className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg" onClick={handleLogin}>
            <FcGoogle className="text-4xl"/>
            <span className="text-white text-2xl">Login with Google</span>
        </button>
    </div>
  );
}

export default Login;
