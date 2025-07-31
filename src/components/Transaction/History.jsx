import React from 'react'
import { useNavigate } from 'react-router'

function History() {
    const navigate = useNavigate()

  return (
    <div className='px-30 py-5'>
      <div className='mt-5 mb-2 text-sm font-semibold'>Semua transaksi</div>
      <div className='my-5'> 
        <div className='history'>
            <div className='flex flex-col gap-1'>
                <div className='text-sm font-bold text-[#64c8b4]'>+ <span className='text-lg'>Rp 10000</span></div>
                <div className='text-xs text-[#c6c0c0]'>17 Agustus 2023 13.10 WIB</div>
            </div>
            <div className='text-right text-xs text-[#c6c0c0] font-semibold'>Top Up Saldo</div>
        </div>
      </div>
      <div onClick={() => navigate('/transaction/all')} className='text-center text-xs text-[#f03c2e] font-semibold cursor-pointer'>Show more</div>
    </div>
  )
}

export default History
