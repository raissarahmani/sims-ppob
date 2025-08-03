import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
// import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { storeToken, storeUserInfo } from '../../redux/slices/authSlice'

import EmailIcon from '../../assets/email.svg'
import PassIcon from '../../assets/pass.svg'
import SeeIcon from '../../assets/eye.svg'
import HideIcon from '../../assets/eye2.svg'

const apiUrl = import.meta.env.VITE_API_URL;

function Login() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [emailMsg, setEmailMsg] = useState('')
  const [passMsg, setPassMsg] = useState('')
  const [msg, setMsg] = useState('')
  const [isEmailMsgVisible, setIsEmailMsgVisible] = useState(false)
  const [isPassMsgVisible, setIsPassMsgVisible] = useState(false)
  const [isMsgVisible, setIsMsgVisible] = useState(false)
  const navigate = useNavigate()

  // const registeredUser = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const loginValid = (e) => {
    e.preventDefault()

    if (!email) {
      setIsEmailMsgVisible(true)
      setEmailMsg("Email harus diisi")
    } else if (!email.includes('@')) {
      setIsEmailMsgVisible(true)
      setEmailMsg ("Email tidak valid")
    } else {
      setIsEmailMsgVisible(false)
    }

    if (!pass) {
      setIsPassMsgVisible(true)
      setPassMsg("Password harus diisi")
      return
    } else if (pass.length < 8) {
      setIsPassMsgVisible(true)
      setPassMsg("Password minimal 8 karakter")
      return
    } else {
      setIsPassMsgVisible(false)
    }

    // demo only: checking email and password from redux store
    // if (registeredUser?.email !== email) {
    //   setIsEmailMsgVisible(true)
    //   setEmailMsg("Email belum terdaftar. Silahkan registrasi")
    //   return
    // }

    // if (registeredUser?.pass !== pass) {
    //   setIsPassMsgVisible(true)
    //   setPassMsg("Password salah")
    //   return
    // }
    
    // API integration
    fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password: pass })
    })
    .then(async (res) => {
      const data = await res.json()
      console.log("Login response:", data)
      if (!res.ok) {
        throw new Error(data.msg || 'Login gagal')
      }

      const token = data.data.token
      dispatch(storeToken({token}))

      fetch(`${apiUrl}/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(async (profileRes) => {
        const profile = await profileRes.json()
        console.log("Profile fetched:", data)
        if (!profileRes.ok) {
          throw new Error(data.msg || 'Gagal mengambil profil')
        }

        dispatch(storeUserInfo({
          user: profile.data
        }))
      })
      .catch((err) => {
        console.error(err)
      })

      navigate('/')
      setEmail('')
      setPass('')
      setMsg('')
    })
    .catch((err) => {
      console.error(err)
      setMsg(err.message)
      setIsMsgVisible(true)
    })
  }

  const resetValue = () => {
    setIsEmailMsgVisible(false)
    setIsPassMsgVisible(false)
    setIsMsgVisible(false)
    setEmailMsg('')
    setPassMsg('')
    setMsg('')
  }

  return (
    <div className='flex flex-col gap-10'>
      <div>
        <div className='text-2xl text-center font-bold my-2 px-30'>Masuk atau buat akun untuk memulai</div>
        <form onSubmit={loginValid} className='flex flex-col items-center gap-2 mt-10 mb-5'>
          <label htmlFor="email" hidden ></label>
          <div className={`flex flex-row items-center gap-2 p-3 input w-3/4 ${isEmailMsgVisible ? "border-[#f03c2e]" : "border-[#c6c0c0]"}`}>
            <img src={EmailIcon} alt="Email" className='w-[15px] h-[15px]'/>
            <input 
              type="email" 
              name="email" 
              value={email} 
              placeholder='Masukkan email anda'
              onChange={(e) => setEmail(e.target.value)} 
              className='border-none outline-none w-full'
            />
          </div>
          <label htmlFor="pass" hidden ></label>
          <div className={`flex flex-row items-center gap-2 p-3 input w-3/4 ${isPassMsgVisible ? "border-[#f03c2e]" : "border-[#c6c0c0]"}`}>
            <img src={PassIcon} alt="Password" className='w-[15px] h-[15px]'/>
            <input 
              type={`${isPassVisible ? "text" : "password"}`} 
              name="pass" 
              value={pass} 
              placeholder='Masukkan password anda'
              onChange={(e) => setPass(e.target.value)} 
              className='border-none outline-none w-full'
            />
            {isPassVisible ? (
              <img src={HideIcon} alt="Hide password" onClick={() => setIsPassVisible(false)} className='w-[15px] h-[15px] cursor-pointer' />
            ) : (
              <img src={SeeIcon} alt="See password" onClick={() => setIsPassVisible(true)} className='w-[15px] h-[15px] cursor-pointer' />
            )}
          </div>
          <button 
              type='submit' 
              className='button my-3 w-3/4'>
                  Masuk
          </button>
        </form>
        <div className='text-xs text-center text-[#c6c0c0] font-semibold'>Belum punya akun? Registrasi <span onClick={() => navigate('/registration')} className='text-[#f03c2e] font-bold cursor-pointer'>di sini</span></div>
      </div>
      <div 
        className={`status-msg ${isEmailMsgVisible || isPassMsgVisible || isMsgVisible ? "visible" : "invisible"}`}>
          <div>{emailMsg || passMsg || msg}</div>
          <div onClick={resetValue} className='cursor-pointer'>x</div>
      </div>
    </div>
  )
}

export default Login
