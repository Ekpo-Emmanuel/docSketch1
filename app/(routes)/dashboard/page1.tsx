'use client';

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, {useEffect, useState} from 'react';
import UnauthorizedRedirect from '@/app/_components/UnauthorizedRedirect';
import LoadingAnimation from '@/app/_components/LoadingAnimation';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function DashboardPage() {
  const { isAuthenticated, isLoading, user } = useKindeBrowserClient();
  const createUser = useMutation(api.user.createUser);
  const router = useRouter();

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
    }

  }, [isAuthenticated, isLoading, router]);
  
  if (isLoading) return <LoadingAnimation />; 

  const getUser = useQuery(api.user.getUser, {email:user?.email});
  const { data: userData } = useQuery(api.user.getUser, { email: user?.email });
  if(!isAuthenticated) return null;


  return (
    <>
      <div>Dashboard</div>
      <Button>
        <LogoutLink>Logout</LogoutLink>
      </Button>
    </>
  );

  
  // return (
  //   <>
  //     <div>Dashboard</div>
  //     <Button>
  //       <LogoutLink>Logout</LogoutLink>
  //     </Button>
  //   </>
  // );
}