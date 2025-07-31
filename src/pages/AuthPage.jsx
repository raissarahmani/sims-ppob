import React from 'react'
import { Outlet } from 'react-router'
import AuthIcon from '../assets/Login.png'
import Logo from '../assets/Saldo.png'

function AuthPage() {
  return (
    <div className='flex flex-row'>
      <div className='w-full pt-15 pb-10 px-20 flex flex-col items-center'>
        <div className='flex flex-row gap-2 my-5'>
            <img src={Logo} alt="SIMS PPOB" className='w-[30px] h-[30px]' />
            <div className='font-bold text-lg'>SIMS PPOB</div>
        </div>
        <Outlet />
      </div>
      <div 
        style={{backgroundImage: `url(${AuthIcon})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat'}}
        className='w-full object-contain'>
      </div>
    </div>
  )
}

export default AuthPage
