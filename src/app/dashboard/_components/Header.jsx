'use client'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
const path = usePathname();
useEffect (()=>{
   console.log(path)
},[])

  return (
    <div className='flex flex-col md:flex-row p-4 items-center justify-between shadow-sm bg-[#f3f3f3]'>
        <div>
            
        </div>
     <ul className='hidden md:flex gap-6'>
      <li className={`hover:bg-gray-100 hover:font-bold transition-all cursor-pointer ${path==`/dashboard`&&`text-primary font-bold`}`}>Dashboard</li>  
      <li className='hover:text-primary hover:font-bold transition-all cursor-pointer'>Qiestions</li>
      <li className='hover:text-primary hover:font-bold transition-all cursor-pointer'>Upgrade</li>
      <li className='hover:text-primary hover:font-bold transition-all cursor-pointer'>How it works</li>
      


     </ul>
     <UserButton/>

    </div>
  )
}

export default Header
