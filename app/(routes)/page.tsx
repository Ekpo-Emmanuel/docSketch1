'use client';

import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";
import Features from "../_components/Features";
import Header from "../_components/Header";
import Hero from "../_components/Hero";
import LoadingAnimation from "../_components/LoadingAnimation";

export default function Home() {
  // const {user} = useKindeBrowserClient();

  
  // useEffect(() => {
  //   if (user) {
  //     // console.log(user)
  //     console.log('User is logged in')
  //   }
  // }, [user])
  
  //loading animation
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    })

    return () => clearTimeout(timer);
  }, [])
  return (
    <>
    {loading ? <LoadingAnimation /> : null}
      <Header />
      <Hero />
      <Features />
    </>
  );
}
