import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const apiUrl = import.meta.env.VITE_API_URL

function History() {
    const [history, setHistory] = useState([])
    const navigate = useNavigate()

    const token = useSelector((state) => state.auth.token)
    useEffect(() => {
      fetch(`${apiUrl}/transaction/history`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })
          .then(async (res) => {
            const data = await res.json()
            console.log("History response:", data)
          
            if (!res.ok) {
              throw new Error(data.message || 'Gagal mengambil riwayat transaksi')
            }

            setHistory(data.data.records)
            })
            .catch((err) => {
              console.error(err)
            })
    }, [token])

    const formatDateTime = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }) + ' WIB'
  }

  return (
    <div className='px-30 py-5 mb-10'>
      <div className='mt-5 mb-2 text-sm font-semibold'>Semua transaksi</div>
      <div className='flex flex-col gap-5 my-5'> 
        {history.length === 0 ? (
          <div className='flex flex-col items-center text-sm text-[#c6c0c0]'>Maaf tidak ada riwayat transaksi saat ini</div>
        ) : (
        <>
          {history.map((transaction, i) => (
            <div key={i} className='history'>
              <div className='flex flex-col gap-1'>
                <div className={`text-sm font-bold ${transaction.transaction_type === 'PAYMENT' ? 'text-[#f03c2e]' : 'text-[#64c8b4]'}`}>
                  {transaction.transaction_type === 'PAYMENT' ? '-' : '+'} <span className='text-lg'>Rp {transaction.total_amount}</span>
                </div>
                <div className='text-xs text-[#c6c0c0]'>{formatDateTime(transaction.created_on)}</div>
              </div>
              <div className='text-right text-xs text-[#c6c0c0] font-semibold'>
                {transaction.transaction_type === 'PAYMENT' ? transaction.description : 'Top Up Saldo'}
              </div>
            </div>
          ))}
        </>
        )}
      </div>
      <div onClick={() => navigate('/transaction/all')} className='text-center text-xs text-[#f03c2e] font-semibold cursor-pointer'>Show more</div>
    </div>
  )
}

export default History
