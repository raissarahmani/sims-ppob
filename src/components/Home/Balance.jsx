import React from 'react'
import Bg from '../../assets/BackgroundSaldo.png'

function Balance() {
  return (
    <div 
      className='w-3/5 h-[130px] p-5' 
      style={{backgroundImage: `url(${Bg})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat'}}
    >
      <div className='text-[#c6c0c0] text-sm font-semibold'>Saldo anda</div>
      <div className='flex flex-row gap-2 my-2'>
        <div className='text-3xl text-[#fafaff] font-semibold'>Rp</div>
        <input type="number" className='text-3xl text-[#fafaff] font-semibold input-readonly'/>
      </div>
      <div className='text-[#c6c0c0] text-xs font-semibold'>Lihat saldo</div>
    </div>
  )
}

export default Balance
