'use client';

import { useEffect } from 'react';
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React from 'react';
import UnauthorizedRedirect from '@/app/_components/UnauthorizedRedirect';
import LoadingAnimation from '@/app/_components/LoadingAnimation';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();
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
  return isAuthenticated ? (
    <>
      <div>Dashboard</div>
      <Button>
        <LogoutLink>Logout</LogoutLink>
      </Button>
    </>
  ) : (
    // <UnauthorizedRedirect />
    null
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