"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation, useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import LoadingAnimation from "@/app/_components/LoadingAnimation";
import GettingStarted from "./_components/GettingStarted";
import UnauthorizedRedirect from "@/app/_components/UnauthorizedRedirect";

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated } = useKindeBrowserClient();
  const {
    email,
    given_name: firstName,
    family_name: lastName,
    picture,
  } = user || {};
  const router = useRouter();
  const userEmail = String(email);
  const convex = useConvex();
  const createUser = useMutation(api.user.createUser);
  const [userChecked, setUserChecked] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !userChecked) {
      checkUser();
      // checkTeams();
    }
  }, [isAuthenticated, userChecked]);



  const checkUser = async () => {
    try {
      const result = await convex.query(api.user.getUser, { email: userEmail });
      if (!result || result.length === 0) {
        await createUser({
          name: String(`${firstName || ''} ${lastName || ''}`.trim()),
          email: userEmail,
          image: user?.picture ? String(user.picture) : '',
        });
      }
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setUserChecked(true);
    }
  };
  
  // const checkTeams = async () => {
  //   try {
  //     const result = await convex.query(api.teams.getTeam);
  //     if (!result || result?.length === 0) {
  //       router.push("/teams/create");
  //       // console.log("User has no teams");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching Teams:", error);
  //   }
  // };

  if (isLoading) return <LoadingAnimation />;

  return <GettingStarted />;
}
