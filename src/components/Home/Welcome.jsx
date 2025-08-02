import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import DefaultPic from '../../assets/default.png'

const apiUrl = import.meta.env.VITE_API_URL

function Welcome() {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')

  const token = useSelector((state) => state.auth.token)
    useEffect(() => {  
      fetch(`${apiUrl}/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(async (res) => {
        console.log(token)
        const data = await res.json()
        console.log("Profile response:", data)
  
        if (!res.ok) {
          throw new Error(data.message || 'Gagal menampilkan nama')
        }

        setFirstname(data.data.first_name)
        setLastname(data.data.last_name)
      })
      .catch((err) => {
        console.error(err)
        alert(err.message)
      })
    }, [token])

  return (
    <div className='w-2/5' >
      <div className='w-[50px] h-[50px]'>
        <img src={DefaultPic} alt={firstname} className='object-fit' />
      </div>
      <div className='mt-5 mb-2 text-sm font-semibold'>Selamat datang,</div>
      <div className='font-bold text-3xl'>{firstname} {lastname}</div>
    </div>
  )
}

export default Welcome
