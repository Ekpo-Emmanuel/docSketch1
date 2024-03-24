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
    

    if (isLoading) return <LoadingAnimation />; 

      return isAuthenticated ? (
        <GettingStarted />
      ) : <UnauthorizedRedirect />;
  }