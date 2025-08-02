import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Logo from '../assets/Saldo.png'
import Sukses from '../assets/success.svg'
import Gagal from '../assets/failed.png'
import { storeOrder, storeTopup } from '../redux/slices/transactionSlice'

const apiUrl = import.meta.env.VITE_API_URL

function Modal({setIsModalOpen, value, type, token}) {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const dispatch = useDispatch()

  const order = useSelector((state) => state.transaction.order)
  const name = order?.name || '';
  const date = order?.date || '';
  const time = order?.time || '';

  const handleConfirm = () => {
    setIsLoading(true)
    setStatus(null)

    if (type === 'topup') {
      fetch(`${apiUrl}/topup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ top_up_amount: value }),
      })
        .then(async (res) => {
          const data = await res.json()
          console.log("Top up response:", data)

          if (!res.ok) {
            throw new Error(data.message || 'Top up gagal')
          }

          setStatus("Sukses")
          setTimeout(() => {
            dispatch(storeTopup({ 
              amount: value, 
              balance: data.data.balance,
              date, 
              time 
            }))
          }, 2000)
        })
        .catch((err) => {
          console.error(err)
          setStatus("Gagal")
        })
    } else if (type === 'transaction') {
        fetch(`${apiUrl}/transaction`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ service_code: order.name }),
        })
          .then(async (res) => {
            const data = await res.json()
            console.log("Transaction response:", data)
          
            if (!res.ok) {
              throw new Error(data.message || 'Transaksi gagal')
            }

              setStatus("Sukses")
              setTimeout(() => {
                dispatch(storeOrder({
                  name: data.data.service_name,
                  price: value,
                  date,
                  time,
                }))
              }, 2000)
            })
            .catch((err) => {
              console.error(err)
              setStatus("Gagal")
            })
    }

    setTimeout(() => {
      setIsLoading(false)      
      if (status !== "Sukses") return
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
            <div className='text-xs font-semibold'>{type === "topup" ? "Top up sebesar" : `Pembayaran ${name} sebesar`}</div>
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
            <div className='text-xs font-semibold'>{type === "topup" ? "Anda yakin untuk top up sebesar" : `Beli ${name} senilai`}</div>
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
