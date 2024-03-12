'use client';

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, from 'react';
import LoadingAnimation from '@/app/_components/LoadingAnimation';
import UnauthorizedRedirect from "@/app/_components/UnauthorizedRedirect";


export default function page() {
    const { isLoading, isAuthenticated } = useKindeBrowserClient();
    if (isLoading) return <LoadingAnimation />;

    return isAuthenticated ? (
      <div>Create Team</div>
    ) : (<UnauthorizedRedirect />);
}
