'use client';

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, {useEffect} from 'react';
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation, useConvex } from "convex/react";
import { useRouter } from 'next/navigation';
import LoadingAnimation from '@/app/_components/LoadingAnimation';
import GettingStarted from "./_components/GettingStarted";
import UnauthorizedRedirect from "@/app/_components/UnauthorizedRedirect";


export default function DashboardPage() {
    const { user, isLoading, isAuthenticated, } = useKindeBrowserClient();
    const { email, given_name: firstName, family_name: lastName, picture } = user || {};
    const router = useRouter();
    const userEmail = String(email);

    const createUser = useMutation(api.user.createUser);
    // const getUser = useQuery(api.user.getUser, { email: userEmail });
    // const teamData = useQuery(api.teams.getTeam, { email: userEmail });
    const convex = useConvex();


    useEffect(() => {
      user && checkTeams();
      user && getAllUsers();
    }, [user])


    //get all users
    const getAllUsers = async () => {
      try {
          const result = await convex.query(api.user.getUser, { email: userEmail });
          // console.log("User data:", userEmail, result);
        //   if (!result) {
        //       const newUser = await createUser({
        //           name: firstName + " " + lastName,
        //           email: userEmail,
        //           image: picture || ''
        //       });
        //       console.log("New user created:", newUser);
        //   }else {
        //     // User already exists in the database
        //     console.log("User already exists in the database.");
        // }
      } catch (error) {
          console.error('Error fetching Users:', error);
      }
    };

    const checkTeams = async () => {
      try {
        const result = await convex.query(api.teams.getTeam);
        if (!result || result?.length === 0) {
          router.push("/teams/create");
          // console.log("User has no teams");
        }
      } catch (error) {
        console.error('Error fetching Teams:', error);
      }
    }

    if (isLoading) return <LoadingAnimation />; 


    return <GettingStarted />;
}