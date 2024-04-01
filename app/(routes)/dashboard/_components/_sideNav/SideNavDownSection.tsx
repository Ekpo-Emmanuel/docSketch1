import {useState, useRef, useEffect} from 'react'
import Link from 'next/link'
import { Flag, Layers, Archive, Lock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
DialogClose,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


interface SideNavDownSectionProps {
  onFileCreate: (fileName: string) => void;
  totalFiles: number;
}

interface MenuItem {
  name: string
  icon: React.ElementType
  letter: string,
  link: string
}

export default function SideNavDownSection({onFileCreate, totalFiles}: SideNavDownSectionProps) {
  const [fileInput, setFileInput] = useState<any>('');
  const router = useRouter();
  
  const menu: MenuItem[] = [
    { name: 'Dashboard', icon: Flag, letter: 'S', link: '/dashboard' },
    { name: 'Manage Teams', icon: Layers, letter: 'T', link: '/teams' },
    { name: 'Private Files', icon: Lock, letter: 'P', link: '#' },
    { name: 'Archive', icon: Archive, letter: 'E', link: '#' },
  ]
  const handleInputChange = (event: { target: { value: any; }; }) => {
    setFileInput(event.target.value);
    
  };

  const maxFiles = 30; 
  const progressPercentage = (totalFiles / maxFiles) * 100;


  return (
    <div className="mt-auto flex flex-col gap-4 ">
        <div>
         {menu.map((item, index) => (
            <div 
              key={index} 
              className="flex items-end justify-between px-4 py-2 rounded-sm w-full cursor-pointer hover:bg-black hover:text-white"
              onClick={() => router.push(item.link)}
            >
                <div className='flex items-center gap-2'>
                  <item.icon size={14} strokeWidth={1.5} />
                  <span className='text-[13px] font-semibold'>{item.name}</span>
                </div>
                <span className='text-[11px] opacity-70'>{item.letter}</span>
            </div>
         ))}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-end justify-between bg-black px-4 py-2 rounded-sm w-full transition ease-in-out duration-300 ">
              <span className='text-white text-[13px] font-semibold'>New File</span>
              <span className='text-white text-[11px] opacity-70'>CTRL N</span>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New File</DialogTitle>
              <DialogDescription>
                Start by creating a new file
              </DialogDescription>
              <DialogDescription>
                  <div className="flex flex-col w-full gap-2 lg:flex-row mt-4">
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      placeholder="Enter File Name"
                      className="block w-full h-10 px-4 py-2 duration-200 border rounded-lg appearance-none bg-chalk border-zinc-300 text-black placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm"
                      onChange={handleInputChange}
                      value={fileInput}
                    />
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button 
                        type="button" 
                        className='text-white bg-blue-600 hover:bg-black'
                        disabled={fileInput.length < 3 || !fileInput} 
                        onClick={() => onFileCreate(fileInput)}
                      >
                        Create 
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                  </div>
                </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      
        <div className='flex flex-col'>
          <div className='w-full h-2 bg-gray-300 rounded-full'>
            <div className='h-2 bg-black rounded-full' style={{width: `${progressPercentage}%`}}></div>
          </div>
          <p className='text-[12px] mt-2'>
            <span className='font-bold'>{totalFiles || 0}</span> out of <span className='font-bold'>{maxFiles}</span> files used.
          </p>
          <p className='text-[12px]'>
            <Link href='/plans' className='underline'>Upgrade</Link> for unlimited access.
          </p>
        </div>
    </div>
  )
}
