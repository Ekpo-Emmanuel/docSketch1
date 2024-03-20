'use client';

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, {useEffect} from 'react';
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
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
    const getUser = useQuery(api.user.getUser, { email: userEmail });
    const teamData = useQuery(api.teams.getTeam, { email: userEmail });

    useEffect(() => {
      const checkAuthentication = async () => {
        if (!isAuthenticated) {
          await router.push("/api/auth/login?post_login_redirect_url=/dashboard");
        } else {
          await router.push("/dashboard");
        }
      };
  
      const createUserIfNotExists = async () => {
        try {
            // Check if the user exists
            const existingUser = await userEmail;
            if (!existingUser) {
                const newUser = await createUser({
                    name: firstName + " " + lastName, 
                    email: userEmail, 
                    image: picture
                });
                console.log("New user created:", newUser);
            } else {
                // console.log("User already exists:", existingUser);
            }
        } catch (error) {
            console.error("Error checking or creating user:", error);
        }
      };
  
      const checkTeam = () => {
        if (!teamData) {
            router.push("/teams/create");
        }
      }
      
      const fetchData = async () => {
        await checkAuthentication();
        await createUserIfNotExists();
        // checkTeam(); // You might want to enable this if needed
      };
  
      if (!isLoading) {
        fetchData();
      }
  
  }, [createUser, firstName, lastName, userEmail, picture, isLoading, isAuthenticated, router, getUser, teamData ]);

    if (isLoading) return <LoadingAnimation />; 


    return isAuthenticated ? (
        <>
          <GettingStarted />
        </>
      ) : (
        // <UnauthorizedRedirect />
        null
      );
}