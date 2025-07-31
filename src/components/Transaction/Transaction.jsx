import React from 'react'
import { useState, useEffect } from 'react'
import Listrik from '../../assets/Listrik.png'
import Modal from '../Modal'

function Transaction() {
  const [value, setValue] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setValue(125000) // example
    }, 1000)
  }, [])

  const payBills = (e) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  return (
    <div className='relative px-30 py-5'>
      <div className='mt-5 mb-2 text-sm font-semibold'>Pembayaran</div>
      <div className='flex flex-row items-center gap-2'>
        <img src={Listrik} alt="Listrik" className='w-[20px] h-[20px]' />
        <div className='text-sm font-bold'>Listrik</div>
      </div>
      <form onSubmit={payBills} className='flex flex-col gap-2 my-10'>
        <label htmlFor="transaction" hidden ></label>
        <input 
            type="number" 
            name="transaction" 
            value={value} 
            readOnly
            className='input'
        />
        <button 
            type='submit' 
            className='button my-3'>
                Bayar
        </button>
      </form>
      {isModalOpen && (
        <div className='fixed inset-0 bg-[#00000099] flex justify-center items-center z-3'>
            <Modal setIsModalOpen={setIsModalOpen} value={value} type="transaction"/>
        </div>
      )}
    </div>
  )
}

export default Transaction
