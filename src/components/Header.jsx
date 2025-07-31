import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router';
import Logo from '../assets/Saldo.png'

function Header() {
  const [active, setActive] = useState(null);
  const navigate = useNavigate()

  const clickedHome = () => {
    setActive("home")
    navigate("/")
  }

  const clickedTopup = () => {
    setActive("topup")
    navigate("/topup")
  }

  const clickedTransaction = () => {
    setActive("transaction")
    navigate("/transaction")
  }

  const clickedAcc = () => {
    setActive("account")
    navigate("/profile")
  }

  return (
    <div className='flex flex-row justify-between items-center gap-20 px-30 py-5 border-b border-[#c6c0c0]'>
      <div onClick={clickedHome} className='flex flex-row gap-2 justify-between items-center cursor-pointer'>
        <img src={Logo} alt="SIMS PPOB" className='w-[20px] h-[20px]' />
        <div className='font-bold text-sm'>SIMS PPOB</div>
      </div>
      <div className='flex flex-row gap-15 justify-between items-center'>
        <div onClick={clickedTopup} className={`nav ${active === "topup" ? "text-[#f03c2e]" : "text-[#1e1e28]"} hover:text-(--color-primary)`}>Top Up</div>
        <div onClick={clickedTransaction} className={`nav ${active === "transaction" ? "text-[#f03c2e]" : "text-[#1e1e28]"} hover:text-(--color-primary)`}>Transaction</div>
        <div onClick={clickedAcc} className={`nav ${active === "account" ? "text-[#f03c2e]" : "text-[#1e1e28]"} hover:text-(--color-primary)`}>Akun</div>
      </div>
    </div>
  )
}

export default Header
