import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from '../Modal'
import Money from '../../assets/money.svg'

import { selectService } from '../../redux/slices/transactionSlice'

const images = import.meta.glob('../../assets/*.png', { eager: true })
function getImage(filename) {
  return images[`../../assets/${filename}`]?.default
}

function Transaction() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()

  const token = useSelector((state) => state.auth.token)

  const service = useSelector((state) => state.transaction.order)
  const service_code = service?.service_code || '';
  const name = service?.name || '';
  const price = service?.price || 0;
  const image = service?.image || '';

  const payBills = (e) => {
    e.preventDefault()
    const now = new Date()
    const date = now.toLocaleDateString("id-ID")
    const time = now.toLocaleTimeString("id-ID")

    dispatch(selectService({ service_code, name, price, image, date, time }))
    setIsModalOpen(true)
  }

  return (
    <div className='relative px-30 py-5'>
      <div className='mt-5 mb-2 text-sm font-semibold'>Pembayaran</div>
      <div className='flex flex-row items-center gap-2'>
        <img src={getImage(image)} alt={name} className='w-[20px] h-[20px]' />
        <div className='text-sm font-bold'>{name}</div>
      </div>
      <form onSubmit={payBills} className='flex flex-col gap-2 my-10'>
        <label htmlFor="transaction" hidden ></label>
        <div className='flex flex-row items-center gap-2 p-3 input'>
          <img src={Money} alt="Nominal" className='w-[20px] h-[20px]'/>
          <input 
            type="number" 
            name="transaction" 
            value={price} 
            readOnly
            className='border-none outline-none w-full'
          />
        </div>
        <button 
            type='submit' 
            className='button my-3'>
                Bayar
        </button>
      </form>
      {isModalOpen && (
        <div className='fixed inset-0 bg-[#00000099] flex justify-center items-center z-3'>
            <Modal setIsModalOpen={setIsModalOpen} value={price} type="transaction" token={token}/>
        </div>
      )}
    </div>
  )
}

export default Transaction
