import React from 'react'
import DefaultPic from '../../assets/default.png'

function Welcome() {
  return (
    <div className='w-2/5' >
      <div className='w-[50px] h-[50px]'>
        <img src={DefaultPic} alt='Nama' className='object-fit' />
      </div>
      <div className='mt-5 mb-2 text-sm font-semibold'>Selamat datang,</div>
      <div className='font-bold text-3xl'>Nama</div>
    </div>
  )
}

export default Welcome
