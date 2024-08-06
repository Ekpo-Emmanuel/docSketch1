"use client";

import React, { useState, useRef, useEffect, useContext } from "react";
import { useMutation, useConvex, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FIleListContent";

import { Plus } from "lucide-react";
import { useRouter } from "@/node_modules/next/navigation";

interface Props {}

interface Team {
  _id: string;
  teamId: string;
  name: string;
  teamName: string;
}

export const Bottom = (props: Props) => {
  const { user }: any = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const [teamsData, setTeamsData] = useState<Team[]>([]); // Initialize with the correct type
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);
  const tasks = useQuery(api.files.getFiles);
  const { allFiles, setAllFiles }: any = useContext(FileListContext);
  const router = useRouter();
  const convex = useConvex();

  useEffect(() => {
    if (user) {
      getTeamList();
    }
  }, [user]);

  useEffect(() => {
    if (activeTeam) {
      setActiveTeam(activeTeam);
      getFiles();
    }
  }, [activeTeam, setActiveTeam]);

  const getTeamList = async () => {
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
    setTeamsData(result);
    setActiveTeam(result[0]);
  };

  const onFileCreate = async (fileName: string) => {
    try {
      const res = await createFile({
        name: fileName,
        teamId: teamsData[teamsData.length - 1]._id,
        createdBy: user?.email,
        archieve: false,
        document: "",
        whiteboard: "",
      });
      toast.success("File Created Successfully", {
        description: "Redirecting",
      });
      router.push(`/workspace/${res}`);
    } catch (err: any) {
      toast.error("Error creating File");
      console.log(err);
    }
  };

  const getFiles = async () => {
    const newFiles = await convex.query(api.files.getFilesByTeamId, {
      teamId: activeTeam?._id,
    });
    setAllFiles(newFiles);
  };

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 gap-5 mt-5">
      <div
        className="flex flex-col gap-2"
        onClick={() => onFileCreate("New File")}
      >
        <div className="w-full h-32 rounded-md border flex items-center justify-center cursor-pointer hover:bg-[#F9F9F9] ">
          <Plus size={20} />
        </div>
        <p className="text-[14px]">Create a Blank File</p>
      </div>
      {/* <div>1</div>
            <div>1</div>
            <div>1</div>
            <div>1</div> */}
    </section>
  );
};
