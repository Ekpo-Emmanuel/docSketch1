'use client';

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, {useEffect, useState} from 'react';
import { Button } from '@/components/ui/button';
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { useRouter } from 'next/navigation';
import LoadingAnimation from '@/app/_components/LoadingAnimation';


export default function DashboardPage() {
    const {user, isLoading, isAuthenticated} = useKindeBrowserClient();
    const userEmail = String(user?.email);
    const lastName = String(user?.family_name);
    const firstName = user?.given_name;
    const picture = user?.picture;
    const router = useRouter();

    const createUser = useMutation(api.user.createUser);

    const getUser = useQuery(api.user.getUser, {email: userEmail});

    useEffect(() => {
        const checkAuthentication = async () => {
            if (!isAuthenticated) {
              await router.push("/api/auth/login?post_login_redirect_url=/dashboard");
            } else {
              await router.push("/dashboard");
            }
          };
          
          

          if (!isLoading) {
            checkAuthentication();
            if (getUser && getUser.data === undefined) {
                createUser({
                    name: firstName + " " + lastName, 
                    email: userEmail, 
                    image: picture
                }).then((res) => {
                    console.log(res)
                });
            }
          }

    }, [
        createUser, 
        firstName, 
        lastName, 
        userEmail, 
        picture, 
        isLoading, 
        isAuthenticated,
        router
    ]);

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