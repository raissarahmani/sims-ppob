import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import EmailIcon from '../../assets/email.svg'
import PassIcon from '../../assets/pass.svg'
import SeeIcon from '../../assets/eye.svg'
import HideIcon from '../../assets/eye2.svg'

function Login() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [emailMsg, setEmailMsg] = useState('')
  const [passMsg, setPassMsg] = useState('')
  const [isEmailMsgVisible, setIsEmailMsgVisible] = useState(false)
  const [isPassMsgVisible, setIsPassMsgVisible] = useState(false)
  const navigate = useNavigate()

  const loginValid = (e) => {
    e.preventDefault()

    if (!email) {
      setIsEmailMsgVisible(true)
      setEmailMsg("Email should be filled")
    } else if (!email.includes('@')) {
      setIsEmailMsgVisible(true)
      setEmailMsg ("Email not valid")
    } else {
      setIsEmailMsgVisible(false)
    }

    if (!pass) {
      setIsPassMsgVisible(true)
      setPassMsg("Password should be filled")
      return
    } else if (pass.length < 8) {
      setIsPassMsgVisible(true)
      setPassMsg("Password should at least has 8 characters")
      return
    } setIsPassMsgVisible(false)

    // fetch(`${VITE_API_URL}/users/login`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ email, password: pass })
    // })
    // .then(async (res) => {
    //   const data = await res.json()
    //   if (!res.ok) {
    //     throw new Error(data.msg || 'Failed to login')
    //   }

    //   const token = data.token
    //   dispatch(login({
    //     token,
    //     user: { email }
    //   }))
    // })
    // .catch((err) => {
    //   console.error(err)
    //   alert(err.message)
    // })

    setEmail('')
    setPass('')
    navigate('/')
  }

  const resetValue = () => {
    setIsEmailMsgVisible(false)
    setIsPassMsgVisible(false)
    setEmailMsg('')
    setPassMsg('')
  }

  return (
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
            <img src={HideIcon} alt="Hide password" onClick={() => setIsPassVisible(false)} className='w-[15px] h-[15px]' />
          ) : (
            <img src={SeeIcon} alt="See password" onClick={() => setIsPassVisible(true)} className='w-[15px] h-[15px]' />
          )}
        </div>
        <button 
            type='submit' 
            className='button my-3 w-3/4'>
                Masuk
        </button>
      </form>
      <div className='text-xs text-center text-[#c6c0c0] font-semibold'>Belum punya akun? Registrasi <span onClick={() => navigate('/registration')} className='text-[#f03c2e] font-bold cursor-pointer'>di sini</span></div>
      <div 
        className={`flex flex-row justify-between items-center error-msg mt-10 py-2 px-5 bg-[#fff5f3] ${isEmailMsgVisible ? "visible" : "invisible"}`}>
          <div>{emailMsg}</div>
          <div onClick={resetValue} className='cursor-pointer'>x</div>
      </div>
      <div 
        className={`flex flex-row justify-between items-center error-msg mt-2 py-2 px-5 bg-[#fff5f3] ${isPassMsgVisible ? "visible" : "invisible"}`}>
          <div>{passMsg}</div>
          <div onClick={resetValue} className='cursor-pointer'>x</div>
      </div>
    </div>
  )
}

export default Login
