import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Bg from '../../assets/BackgroundSaldo.png'
  
function Balance() {
  const [showBalance, setShowBalance] = useState(false)
  const balance = useSelector((state) => state.transaction.balance) ?? 0
  const nominalBalance = () => {
    setShowBalance((showBalance) => !showBalance)
  }

  return (
    <div 
      className='w-3/5 h-[130px] p-5' 
      style={{backgroundImage: `url(${Bg})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat'}}
    >
      <div className='text-[#c6c0c0] text-sm font-semibold'>Saldo anda</div>
      <div className='flex flex-row gap-2 my-2'>
        <div className='text-3xl text-[#fafaff] font-semibold'>Rp</div>
        <input 
          type={showBalance ? "number" : "password"} 
          value={balance}
          readOnly  
          className='text-3xl text-[#fafaff] font-semibold input-readonly'
        />
      </div>
      <div className='flex flex-row relative'>
        <div className='text-[#c6c0c0] text-xs font-semibold'>Lihat saldo</div>
        <button onClick={nominalBalance} className='absolute top-0 left-17 cursor-pointer w-[10px] h-[10px]'></button>
      </div>
    </div>
  )
}

export default Balance
