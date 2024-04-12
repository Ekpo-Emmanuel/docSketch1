import React from 'react'
import logo from '../../public/images/logo.svg';
import Image from 'next/image';



export default function LoadingAnimation() {
  return (
    <div className="flex items-center justify-center w-full h-screen fixed top-0 left-0 bg-white z-50">
      <div className="flex justify-center items-center space-x-1 text-sm ">
        <Image
          src={logo}
          alt="Logo"
          width={200}
          height={200}
        />
      </div>
    </div>
  )
}
