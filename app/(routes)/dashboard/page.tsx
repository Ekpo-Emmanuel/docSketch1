'use client';

import { Button } from '@/components/ui/button'
import {LogoutLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React from 'react'
import UnauthorizedRedirect from '@/app/_components/UnauthorizedRedirect';
import LoadingAnimation from '@/app/_components/LoadingAnimation';

export default function page() {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading) return <LoadingAnimation />
  return isAuthenticated ? (
    <>
      <div>Dashboard</div>
      <Button>
        <LogoutLink>Logout</LogoutLink>
      </Button>
    </>
  ) : (
    <UnauthorizedRedirect />
  );
}
