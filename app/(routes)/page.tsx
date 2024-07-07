"use client";

// import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";
import Features from "../_components/Features";
// import Features from "../_components/_features/Features";
import Header from "../_components/Header";
import Hero from "../_components/Hero";
import LaunchingSoon from "../_components/LaunchingSoon";
import LoadingAnimation from "../_components/LoadingAnimation";
import Announcement from "../_components/Announcement"

export default function Home() {
  // const {user} = useKindeBrowserClient();

  // useEffect(() => {
  //   if (user) {
  //     // console.log(user)
  //     console.log('User is logged in')
  //   }
  // }, [user])

  //loading animation

  return (
    <>
      {/* <LoadingAnimation show={loading} /> */}
      <Announcement />
      <Header />
      <Hero />
      <Features />
      <LaunchingSoon />
    </>
  );
}
