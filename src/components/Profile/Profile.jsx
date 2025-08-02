import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'

import EmailIcon from '../../assets/email.svg'
import User from '../../assets/user.svg'
import Defaultpic from '../../assets/default.png'

const apiUrl = import.meta.env.VITE_API_URL;

function Profile() {
  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const token = useSelector((state) => state.auth.token)
  useEffect(() => {
    if (!token) return ('Silahkan login terlebih dahulu')

    fetch(`${apiUrl}/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(async (res) => {
      const data = await res.json()
      console.log("Profile response:", data)

      if (!res.ok) {
        throw new Error(data.message || 'Gagal menampilkan profil')
      }

      setEmail(data.data.email)
      setFirstname(data.data.first_name)
      setLastname(data.data.last_name)
    })
    .catch((err) => {
      console.error(err)
      alert(err.message)
    })
  }, [token])

  const handleLogout = () => {
      dispatch(logout())
      navigate("/login")
  }
  
  return (
    <div>
      <div className='flex flex-col items-center rounded-full mb-3'>
          <img src={Defaultpic} alt="profile picture" className='object-cover' />
        </div>
        <div className='font-bold text-2xl text-center'>{firstname} {lastname}</div>
        <form className='flex flex-col gap-3 mt-5'>
          <label htmlFor="email" className='label' >Email</label>
          <div className={`flex flex-row items-center gap-2 p-3 input w-full`}>
            <img src={EmailIcon} alt="Email" className='w-[15px] h-[15px]'/>
            <input 
              type="email" 
              name="email" 
              value={email} 
              placeholder={email}
              readOnly
              className='border-none outline-none w-full'
            />
          </div>
          <label htmlFor="firstname" className='label'>Nama depan</label>
          <div className={`flex flex-row items-center gap-2 p-3 input w-full`}>
            <img src={User} alt="First name" className='w-[15px] h-[15px]'/>
            <input 
              type="text" 
              name="firstname" 
              value={firstname} 
              placeholder={firstname} 
              readOnly
              className='border-none outline-none w-full'
            />
          </div>
          <label htmlFor="lastname" className='label'>Nama belakang</label>
          <div className={`flex flex-row items-center gap-2 p-3 input w-full`}>
            <img src={User} alt="Last name" className='w-[15px] h-[15px]'/>
            <input 
              type="text" 
              name="lastname" 
              value={lastname} 
              placeholder={lastname}
              readOnly
              className='border-none outline-none w-full'
            />
          </div>
          <div className='flex flex-col gap-2 mt-7'>
            <button 
              type='button'
              onClick={() => navigate('/profile/update')}
              className='button w-full'>
                  Edit profile
            </button>
            <button 
              type='button' 
              onClick={handleLogout}
              className='button w-full text-[#f03c2e] bg-[#fafaff] border'>
                  Logout
            </button>
          </div>
        </form>
    </div>
  )
}

export default Profile
