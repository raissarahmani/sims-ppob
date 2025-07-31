import React from 'react'
import { useState } from 'react'
import Logo from '../assets/Saldo.png'
import Sukses from '../assets/success.svg'
import Gagal from '../assets/failed.png'

function Modal({setIsModalOpen, value, type = "topup"}) {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const handleConfirm = () => {
    setIsLoading(true)
    setStatus(null)
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5 // success-failure probability 50% 
      setIsLoading(false)
      setStatus(isSuccess ? 'Sukses' : 'Gagal')
    }, 2000)
  }

  return (
    <div className='fixed top-1/2 left-1/2 p-8 w-1/4 bg-[#fafaff] rounded-sm transform -translate-x-1/2 -translate-y-1/2 z-4'>
        {isLoading && (type === "topup" || type === "transaction") ? (
          <div className='flex flex-col items-center'>
            <div className='loader'></div>
          </div>
        ) : status === 'Sukses' || status === 'Gagal' ? (
          <div className='flex flex-col items-center text-center'>
            <img src={status === 'Sukses' ? Sukses : Gagal} alt={status} className='mb-3 w-[40px] h-[40px]' />
            <div className='text-xs font-semibold'>{type === "topup" ? "Top up sebesar" : `Pembayaran {nama} sebesar`}</div>
            <div className='font-bold my-2'>Rp{value}</div>
            <div className='text-xs font-semibold'>{status}</div>
            <button 
                type='button' 
                onClick={() => setIsModalOpen(false)} 
                className='button bg-[#fafaff] border-[#fafaff] text-[#f03c2e] font-semibold'>
                Kembali ke Beranda
            </button>
          </div>
        ) : (
          <div className='flex flex-col items-center text-center'>
            <img src={Logo} alt="Topup" className='mb-3 w-[40px] h-[40px]' />
            <div className='text-xs font-semibold'>{type === "topup" ? "Anda yakin untuk top up sebesar" : `Beli {nama} senilai`}</div>
            <div className='font-bold my-2'>Rp{value}?</div>
            <div className='flex flex-col justify-between items-center mt-2'>
              <button 
                type='button' 
                onClick={handleConfirm} 
                className='button bg-[#fafaff] border-[#fafaff] text-[#f03c2e] font-semibold p-1 m-0'>
                    Ya, lanjutkan {type === "topup" ? "top up" : "bayar"}
                </button>
              <button 
                type='button' 
                onClick={() => setIsModalOpen(false)} 
                className='button bg-[#fafaff] border-[#fafaff] text-[#c6c0c0] font-semibold p-1 m-0'>
                    Batalkan
                </button>
            </div>
          </div>
        )}   
    </div>
  )
}

export default Modal
