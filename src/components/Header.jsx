import React from 'react'
import Logo from '../assets/Saldo.png'

function Header() {
  return (
    <div className='flex flex-row justify-between items-center gap-20 px-30 py-5 border-b border-[#c6c0c0]'>
      <div className='flex flex-row gap-2 justify-between items-canter'>
        <img src={Logo} alt="SIMS PPOB" className='w-[20px] h-[20px]' />
        <div className='font-bold text-sm'>SIMS PPOB</div>
      </div>
      <div className='flex flex-row gap-15 justify-between items-canter'>
        <div className='nav'>Top Up</div>
        <div className='nav'>Transaction</div>
        <div className='nav'>Akun</div>
      </div>
    </div>
  )
}

export default Header
