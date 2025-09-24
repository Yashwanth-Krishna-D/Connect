import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/AnimatedText.module.css";

function Login() {
  const text = "Connect";
  const [playing, setPlaying] = useState(true);

  // Switch from GIF to PNG after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setPlaying(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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
    </div>
  );
}

export default Login;
