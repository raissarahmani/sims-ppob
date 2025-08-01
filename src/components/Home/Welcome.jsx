import React from 'react'
import { useSelector } from 'react-redux'
import DefaultPic from '../../assets/default.png'

// const apiUrl = import.meta.env.VITE_API_URL

function Welcome() {
  const userInfo = useSelector((state) => state.auth.user)
  const firstname = userInfo.firstname
  const lastname = userInfo.lastname

  return (
    <div className='w-2/5' >
      <div className='w-[50px] h-[50px]'>
        <img src={DefaultPic} alt='Nama' className='object-fit' />
      </div>
      <div className='mt-5 mb-2 text-sm font-semibold'>Selamat datang,</div>
      <div className='font-bold text-3xl'>{firstname} {lastname}</div>
    </div>
  )
}

export default Welcome
