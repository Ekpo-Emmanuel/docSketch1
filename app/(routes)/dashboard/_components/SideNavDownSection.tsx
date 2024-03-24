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




interface MenuItem {
  name: string
  icon: React.ElementType
  letter: string,
  link: string
}

export default function SideNavDownSection({onFileCreate}: any) {
  const [fileInput, setFileInput] = useState<any>('');
  const menu: MenuItem[] = [
    { name: 'Getting Started', icon: Flag, letter: 'S', link: '#' },
    { name: 'Teams', icon: Layers, letter: 'T', link: '#' },
    { name: 'Private Files', icon: Lock, letter: 'P', link: '#' },
    { name: 'Archive', icon: Archive, letter: 'E', link: '#' },
  ]
  const handleInputChange = (event: { target: { value: any; }; }) => {
    setFileInput(event.target.value);
  };


  return (
    <div className="mt-auto flex flex-col gap-4 ">
        <div>
         {menu.map((item, index) => (
            <Link 
              href='#' 
              key={index} 
              className="flex items-end justify-between px-4 py-2 rounded-sm w-full hover:bg-gray-200 focus:bg-black focus:text-white"
            >
                <div className='flex items-center gap-3'>
                  <item.icon size={14} strokeWidth={2} />
                  <span className='text-[13px] font-semibold'>{item.name}</span>
                </div>
                <span className='text-[11px] opacity-70'>{item.letter}</span>
            </Link>
         ))}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-end justify-between bg-black px-4 py-2 rounded-sm w-full transition ease-in-out duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-black">
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
            <div className='w-1/3 h-full bg-black rounded-full'></div>
          </div>
          <p className='text-[12px] mt-2'>
            <span className='font-bold'>1</span> out of <span className='font-bold'>5</span> files used.
          </p>
          <p className='text-[12px]'>
            <Link href='/plans' className='underline'>Upgrade</Link> for unlimited access.
          </p>
        </div>
    </div>
  )
}
