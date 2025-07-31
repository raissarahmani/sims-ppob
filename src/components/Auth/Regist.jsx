import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import EmailIcon from '../../assets/email.svg'
import User from '../../assets/user.svg'
import PassIcon from '../../assets/pass.svg'
import SeeIcon from '../../assets/eye.svg'
import HideIcon from '../../assets/eye2.svg'

function Regist() {
  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false)
  const [msg, setMsg] = useState('')
  const [isMsgVisible, setIsMsgVisible] = useState(false)
  const navigate = useNavigate()

  const loginValid = (e) => {
    e.preventDefault()

    if (!email) {
      setIsMsgVisible(true)
      setMsg("Email should be filled")
    } else if (!email.includes('@')) {
      setIsMsgVisible(true)
      setMsg ("Email not valid")
    } else {
      setIsMsgVisible(false)
    }

    if (!firstname) {
      setIsMsgVisible(true)
      setMsg("First name should be filled")
    } else {
      setIsMsgVisible(false)
    }

    if (!lastname) {
      setIsMsgVisible(true)
      setMsg("Last name should be filled")
    } else {
      setIsMsgVisible(false)
    }

    if (!pass) {
      setIsMsgVisible(true)
      setMsg("Password should be filled")
      return
    } else if (pass.length < 8) {
      setIsMsgVisible(true)
      setMsg("Password should at least has 8 characters")
      return
    } setIsMsgVisible(false)

    if (!confirmPass) {
      setIsMsgVisible(true)
      setMsg("Retype your password")
      return
    } else if (confirmPass !== pass) {
      setIsMsgVisible(true)
      setMsg("Password should be the same")
      return
    } setIsMsgVisible(false)

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
  }

  const resetValue = () => {
    setIsMsgVisible(false)
    setMsg('')
  }

  return (
    <div>
      <div className='text-2xl text-center font-bold my-2 px-30'>Lengkapi data untuk membuat akun</div>
      <form onSubmit={loginValid} className='flex flex-col items-center gap-2 mt-10 mb-5'>
        <label htmlFor="email" hidden ></label>
        <div className={`flex flex-row items-center gap-2 p-3 input w-3/4 ${isMsgVisible ? "border-[#f03c2e]" : "border-[#c6c0c0]"}`}>
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
        <label htmlFor="firstname" hidden ></label>
        <div className={`flex flex-row items-center gap-2 p-3 input w-3/4 ${isMsgVisible ? "border-[#f03c2e]" : "border-[#c6c0c0]"}`}>
          <img src={User} alt="First name" className='w-[15px] h-[15px]'/>
          <input 
            type="text" 
            name="firstname" 
            value={firstname} 
            placeholder='Masukkan nama depan anda'
            onChange={(e) => setFirstname(e.target.value)} 
            className='border-none outline-none w-full'
          />
        </div>
        <label htmlFor="lastname" hidden ></label>
        <div className={`flex flex-row items-center gap-2 p-3 input w-3/4 ${isMsgVisible ? "border-[#f03c2e]" : "border-[#c6c0c0]"}`}>
          <img src={User} alt="Last name" className='w-[15px] h-[15px]'/>
          <input 
            type="text" 
            name="lastname" 
            value={lastname} 
            placeholder='Masukkan nama belakang anda'
            onChange={(e) => setLastname(e.target.value)} 
            className='border-none outline-none w-full'
          />
        </div>
        <label htmlFor="pass" hidden ></label>
        <div className={`flex flex-row items-center gap-2 p-3 input w-3/4 ${isMsgVisible ? "border-[#f03c2e]" : "border-[#c6c0c0]"}`}>
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
        <label htmlFor="confirmpass" hidden ></label>
        <div className={`flex flex-row items-center gap-2 p-3 input w-3/4 ${isMsgVisible ? "border-[#f03c2e]" : "border-[#c6c0c0]"}`}>
          <img src={PassIcon} alt="Confirm password" className='w-[15px] h-[15px]'/>
          <input 
            type={`${isConfirmPassVisible ? "text" : "password"}`} 
            name="confirmpass" 
            value={confirmPass} 
            placeholder='Masukkan kembali password anda'
            onChange={(e) => setConfirmPass(e.target.value)} 
            className='border-none outline-none w-full'
          />
          {isConfirmPassVisible ? (
            <img src={HideIcon} alt="Hide password" onClick={() => setIsConfirmPassVisible(false)} className='w-[15px] h-[15px]' />
          ) : (
            <img src={SeeIcon} alt="See password" onClick={() => setIsConfirmPassVisible(true)} className='w-[15px] h-[15px]' />
          )}
        </div>
        <button 
            type='submit' 
            className='button my-3 w-3/4'>
                Registrasi
        </button>
      </form>
      <div className='text-xs text-center text-[#c6c0c0] font-semibold'>Sudah punya akun? Login <span onClick={() => navigate('/login')} className='text-[#f03c2e] font-bold cursor-pointer'>di sini</span></div>
      <div 
        className={`flex flex-row justify-between items-center error-msg mt-2 py-2 px-5 bg-[#fff5f3] ${isMsgVisible ? "visible" : "invisible"}`}>
          <div>{msg}</div>
          <div onClick={resetValue} className='cursor-pointer'>x</div>
      </div>
    </div>
  )
}

export default Regist
