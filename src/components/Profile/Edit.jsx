import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { storeUserInfo } from '../../redux/slices/authSlice'

import EmailIcon from '../../assets/email.svg'
import User from '../../assets/user.svg'
import Defaultpic from '../../assets/default.png'

const apiUrl = import.meta.env.VITE_API_URL;

function Edit() {
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [profilePic, setProfilePic] = useState(Defaultpic)
    const [newImage, setNewImage] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [newEmail, setNewEmail] = useState('')
    const [newFirstname, setNewFirstname] = useState('')
    const [newLastname, setNewLastname] = useState('')

    const [emailMsg, setEmailMsg] = useState('')
    const [firstnameMsg, setFirstnameMsg] = useState('')
    const [lastnameMsg, setLastnameMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [isEmailMsgVisible, setIsEmailMsgVisible] = useState(false)
    const [isFirstnameMsgVisible, setIsFirstnameMsgVisible] = useState(false)
    const [isLastnameMsgVisible, setIsLastnameMsgVisible] = useState(false)
    const [isSuccessMsgVisible, setIsSuccessMsgVisible] = useState(false)

    const token = useSelector((state) => state.auth.token)
    useEffect(() => {
      if (!token) return ('Silahkan login terlebih dahulu')

      fetch(`${apiUrl}/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          const data = await res.json()
          if (!res.ok) throw new Error(data.message || 'Gagal mengambil profil')

          setEmail(data.data.email)
          setFirstname(data.data.first_name)
          setLastname(data.data.last_name)
          setProfilePic(data.data.profile_image || Defaultpic)
          setSuccessMsg('')

          setNewEmail(data.data.email)
          setNewFirstname(data.data.first_name)
          setNewLastname(data.data.last_name)
        })
        .catch((err) => setSuccessMsg(err.message))
    }, [token])

    const handleImage = (e) => {
      const pic = e.target.files[0]
      if (!pic) return

      const isValidType = ['image/png', 'image/jpeg'].includes(pic.type)
      const isValidSize = pic.size <= 100 * 1024
      if (!isValidType) {
        alert("Hanya file PNG atau JPEG yang diperbolehkan.")
        return
      }
    
      if (!isValidSize) {
        alert("Ukuran gambar tidak boleh lebih dari 100KB.")
        return
      }
    
      setNewImage(pic)
      setProfilePic(URL.createObjectURL(pic)) 
    }

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
        return
      } else {
        setIsEmailMsgVisible(false)
        setIsFirstnameMsgVisible(false)
        setIsLastnameMsgVisible(false)
      }

      fetch(`${apiUrl}/profile/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: newEmail,
          first_name: newFirstname,
          last_name: newLastname,
        }),
      })
        .then(async (res) => {
          const data = await res.json()
          if (!res.ok) throw new Error(data.message || 'Update profil gagal')
          
          await uploadImage()

          setEmail(newEmail)
          setFirstname(newFirstname)
          setLastname(newLastname)
          setSuccessMsg('Profil berhasil diperbarui')
          setIsSuccessMsgVisible(true)

          dispatch(storeUserInfo({
            user: { 
              email: newEmail || email, 
              firstname: newFirstname || firstname, 
              lastname: newLastname || lastname,
              profile_image: `${apiUrl}/profile/image/${data.data.profile_image} || ${Defaultpic}`
            }
          }))

          setTimeout(() => {
            navigate('/profile')
          }, 3000)
        })
        .catch((err) => setSuccessMsg(err.message))
    }

    const uploadImage = async () => {
      if (!newImage) return

      const formData = new FormData()
      formData.append('image', newImage)

      try {
        const res = await fetch(`${apiUrl}/profile/image`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        })
      
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Upload foto gagal")
        
        setProfilePic(`${apiUrl}/profile/image/${data.data.profile_image}`)
        console.log('Image uploaded:', data)
      } catch (err) {
        console.error(err.message)
      }
    }

    const resetValue = () => {
    setIsSuccessMsgVisible(false)
    setSuccessMsg('')
  }

  return (
    <div className='flex flex-col gap-10'>
      <div>
        <div className='flex flex-col items-center rounded-full mb-3'>
          <label htmlFor="image-upload" className='text-xs mt-2 cursor-pointer text-[#f03c2e]'>
            <img src={profilePic} alt={firstname} className='w-25 h-25 rounded-full object-cover' />
          </label>
          <input 
            id="image-upload" 
            type="file" 
            accept="image/jpeg, image/png" 
            onChange={handleImage} 
            className='hidden'
          />
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
      <div 
        className={`status-msg ${isSuccessMsgVisible ? "visible" : "invisible"}`}>
          <div>{successMsg}</div>
          <div onClick={resetValue} className='cursor-pointer'>x</div>
      </div>
    </div>
  )
}

export default Edit
