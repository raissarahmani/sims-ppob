import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const apiUrl = import.meta.env.VITE_API_URL

function ShowMore() {
    const [history, setHistory] = useState([]) 
    const [active, setActive] = useState(new Date().getMonth())

    const months = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli",
      "Agustus", "September", "Oktober", "November", "Desember",
    ]

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
        if (!res.ok) throw new Error(data.message)
        setHistory(data.data.records)
      })
      .catch((err) => console.error(err))
    }, [token])

    const transactionsByMonth = Array.from({ length: 12 }, (_, i) => {
      return history.filter(tx => new Date(tx.created_on).getMonth() === i)
    })

  return (
    <div className='px-30 py-5'>
      <div className='mt-5 mb-2 text-sm font-semibold'>Semua transaksi</div>
      <div className='flex flex-row gap-5'> 
        {months.map((month, i) => (
            <div 
                onClick={() => setActive(i)} 
                key={i}
                className={`text-sm cursor-pointer ${active === i ? "font-bold" : "text-[#c6c0c0] font-semibold"}`}
            >
                {month}
            </div>
        ))}
      </div>
      <div className='flex flex-col gap-5 my-5'> 
        {transactionsByMonth[active].length === 0 ? (
          <div className='mt-10 text-center text-sm text-[#c6c0c0]'>Maaf tidak ada riwayat transaksi saat ini</div>
        ) : (
        <>
          {transactionsByMonth[active].map((transaction, i) => (
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
    </div>
  )
}

export default ShowMore
