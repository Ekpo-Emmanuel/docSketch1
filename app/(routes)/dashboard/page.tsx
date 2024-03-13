'use client';

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, {useEffect} from 'react';
import { Button } from '@/components/ui/button';
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { useRouter } from 'next/navigation';
import LoadingAnimation from '@/app/_components/LoadingAnimation';


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
          if (!isAuthenticated) { await router.push("/api/auth/login?post_login_redirect_url=/dashboard"); } else { await router.push("/dashboard"); }
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

        const checkTeam = async () => {
          if (!teamData) {
            await router.push("/teams/create");
          }
        }
        
        if (!isLoading) {
          checkAuthentication();
          createUserIfNotExists();
          checkTeam();
        }

    }, [createUser, firstName, lastName, userEmail, picture, isLoading, isAuthenticated, router, getUser, teamData ]);

    if (isLoading) return <LoadingAnimation />; 


    return isAuthenticated ? (
        <>
          
          <div>Dashboard</div>
            <p>{firstName} {lastName}</p>
            <p>{userEmail}</p>
            <img src={picture} alt={firstName} />
            <Button>
                <LogoutLink>Logout</LogoutLink>
            </Button>
        </>
      ) : (
        // <UnauthorizedRedirect />
        null
      );
}