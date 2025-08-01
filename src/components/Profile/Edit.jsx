import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { storeUserInfo } from '../../redux/slices/authSlice'

import EmailIcon from '../../assets/email.svg'
import User from '../../assets/user.svg'
import Defaultpic from '../../assets/default.png'

// const apiUrl = import.meta.env.VITE_API_URL;

function Edit() {
    const userInfo = useSelector((state) => state.auth.user)
    const email = userInfo.email
    const firstname = userInfo.firstname
    const lastname = userInfo.lastname
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [newEmail, setNewEmail] = useState('')
    const [newFirstname, setNewFirstname] = useState('')
    const [newLastname, setNewLastname] = useState('')

    const [emailMsg, setEmailMsg] = useState('')
    const [firstnameMsg, setFirstnameMsg] = useState('')
    const [lastnameMsg, setLastnameMsg] = useState('')
    const [isEmailMsgVisible, setIsEmailMsgVisible] = useState(false)
    const [isFirstnameMsgVisible, setIsFirstnameMsgVisible] = useState(false)
    const [isLastnameMsgVisible, setIsLastnameMsgVisible] = useState(false)

    const [isUpdated, setIsUpdated] = useState(false)

    useEffect(() => {
      if (userInfo && !isUpdated) {
        setNewEmail(userInfo.email || '');
        setNewFirstname(userInfo.firstname || '');
        setNewLastname(userInfo.lastname || '');
      }
    }, [userInfo, isUpdated])

    const updateProfile = (e) => {
      e.preventDefault()

      if (!newEmail) {
        setIsEmailMsgVisible(true)
        setEmailMsg("Email should be filled")
      } else if (!newFirstname) {
        setIsFirstnameMsgVisible(true)
        setFirstnameMsg("First name should be filled")
      } else if (!newLastname) {
        setIsLastnameMsgVisible(true)
        setLastnameMsg("Last name should be filled")
      } else if (!newEmail.includes('@')) {
        setIsEmailMsgVisible(true)
        setEmailMsg ("Email not valid")
      } else {
        setIsEmailMsgVisible(false)
        setIsFirstnameMsgVisible(false)
        setIsLastnameMsgVisible(false)
      }

      dispatch(storeUserInfo({
          user: { 
            email: newEmail, 
            firstname: newFirstname, 
            lastname: newLastname 
          }
        }))

    //   API Integration
    //   fetch(`${apiUrl}/profile/update`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       email: newEmail,
    //       firstname: newFirstname,
    //       lastname: newLastname,
    //     }),
    //   })
    //   .then(async (res) => {
    //     const data = await res.json()
    //     if (!res.ok) {
    //       throw new Error(data.msg || 'Failed to register')
    //     }

    //     dispatch(storeUserInfo({
    //       user: { 
    //         email: newEmail, 
    //         firstname: newFirstname, 
    //         lastname: newLastname 
    //       }
    //     }))
    //   })
    //   .catch((err) => {
    //     console.error(err)
    //     alert(err.message)
    //   })

      setIsUpdated(true)
      navigate('/profile')
    }

  return (
    <div>
        <div className='flex flex-col items-center rounded-full mb-3'>
          <img src={Defaultpic} alt="profile picture" className='object-cover' />
        </div>
        <div className='font-bold text-2xl text-center'>{firstname} {lastname}</div>
        <form onSubmit={updateProfile} className='flex flex-col gap-2 mt-5'>
          <label htmlFor="email" className='label' >Email</label>
          <div className={`flex flex-row items-center gap-2 p-3 input w-full`}>
            <img src={EmailIcon} alt="Email" className='w-[15px] h-[15px]'/>
            <input 
              type="email" 
              name="email" 
              value={newEmail} 
              placeholder={`${email}` || "Masukkan email anda"}
              onChange={(e) => setNewEmail(e.target.value)} 
              className='border-none outline-none w-full'
            />
          </div>
          <p className={`error-msg text-right ${isEmailMsgVisible ? "visible" : "invisible"}`}>{emailMsg}</p>
          <label htmlFor="firstname" className='label'>Nama depan</label>
          <div className={`flex flex-row items-center gap-2 p-3 input w-full`}>
            <img src={User} alt="First name" className='w-[15px] h-[15px]'/>
            <input 
              type="text" 
              name="firstname" 
              value={newFirstname} 
              placeholder={`${firstname}` || "Masukkan nama depan anda"}
              onChange={(e) => setNewFirstname(e.target.value)} 
              className='border-none outline-none w-full'
            />
          </div>
          <p className={`error-msg text-right ${isFirstnameMsgVisible ? "visible" : "invisible"}`}>{firstnameMsg}</p>
          <label htmlFor="lastname" className='label'>Nama belakang</label>
          <div className={`flex flex-row items-center gap-2 p-3 input w-full`}>
            <img src={User} alt="Last name" className='w-[15px] h-[15px]'/>
            <input 
              type="text" 
              name="lastname" 
              value={newLastname} 
              placeholder={`${lastname}` || "Masukkan nama belakang anda"}
              onChange={(e) => setNewLastname(e.target.value)} 
              className='border-none outline-none w-full'
            />
          </div>
          <p className={`error-msg text-right ${isLastnameMsgVisible ? "visible" : "invisible"}`}>{lastnameMsg}</p>
          <div className='flex flex-col gap-2 mt-7'>
            <button 
              type='submit' 
              className='button w-full'>
                  Simpan
            </button>
            <button 
              type='button' 
              onClick={() => navigate('/profile')}
              className='button w-full text-[#f03c2e] bg-[#fafaff] border'>
                  Batalkan
            </button>
          </div>
        </form>
    </div>
  )
}

export default Edit
