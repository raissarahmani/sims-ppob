import React from 'react'
import { useState } from 'react'
import Modal from '../Modal'
import Money from '../../assets/money.svg'

function Topup() {
  const [msg, setMsg] = useState("Silahkan topup dengan nominal yang sesuai")
  const [isVisible, setIsVisible] = useState(false)
  const [value, setValue] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const nominal = [
    {n: 10000},
    {n: 20000},
    {n: 50000},
    {n: 100000},
    {n: 250000},
    {n: 500000},
  ]

  const nominalValid = (e) => {
    e.preventDefault()

    if (value < 10000) {
      setIsVisible(true)
      setMsg("Minimum topup Rp 10.000")
    } else if (value > 1000000) {
      setIsVisible(true)
      setMsg("Maximum topup Rp 1.000.000")
    } else {
      setIsVisible(false)
      setMsg("Silahkan topup dengan nominal yang sesuai")
      setIsModalOpen(true)
    }
  }
 
  const handleAutofill = (val) => {
    setValue(val);
  }

  return (
    <div className='relative px-30 py-5'>
      <div className='mt-5 mb-2 text-sm font-semibold'>Silahkan masukkan</div>
      <div className='font-bold text-2xl'>Nominal Top Up</div>
      <form onSubmit={nominalValid} className='flex flex-row gap-5 justify-between items-center my-10'>
        <div className='flex flex-col w-1/2'>
            <label htmlFor="topup" hidden ></label>
            <div className='flex flex-row items-center gap-2 p-3 input'>
              <img src={Money} alt="Nominal" className='w-[20px] h-[20px]'/>
              <input 
                type="number" 
                name="topup" 
                value={value} 
                placeholder='Masukkan nominal topup'
                onChange={(e) => setValue(e.target.value)} 
                className='border-none outline-none w-full'
            />
            </div>
            
            <p className={`error-msg ${isVisible ? "visible" : "invisible"}`}>{msg}</p>
            <button 
                type='submit' 
                disabled={!value || value == 0}
                className='button my-3 disabled:cursor-not-allowed'>
                    Top Up
            </button>
        </div>
        <div className='w-1/2 grid grid-cols-3 grid-rows-2 gap-5'>
            {nominal.map((num, i) => (
                <button 
                  type='button' 
                  onClick={() => handleAutofill(num.n)} 
                  key={i} 
                  className='button bg-[#fafaff] text-[#1e1e28] border border-[#c6c0c0] mb-2 hover:border-[#f03c2e] hover:text-[#f03c2e]'>
                    Rp{num.n}
                </button>
            ))}
        </div>
      </form>
      {isModalOpen && (
        <div className='fixed inset-0 bg-[#00000099] flex justify-center items-center z-3'>
            <Modal setIsModalOpen={setIsModalOpen} value={value} type="topup" />
        </div>
      )}
    </div>
  )
}

export default Topup
