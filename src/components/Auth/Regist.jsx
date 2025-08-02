import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
// import { useSelector } from 'react-redux'
import { storeUserInfo } from '../../redux/slices/authSlice'

import EmailIcon from '../../assets/email.svg'
import User from '../../assets/user.svg'
import PassIcon from '../../assets/pass.svg'
import SeeIcon from '../../assets/eye.svg'
import HideIcon from '../../assets/eye2.svg'

const apiUrl = import.meta.env.VITE_API_URL;

function Regist() {
  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [isPassVisible, setIsPassVisible] = useState(false)
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false)

  const [emailMsg, setEmailMsg] = useState('')
  const [firstnameMsg, setFirstnameMsg] = useState('')
  const [lastnameMsg, setLastnameMsg] = useState('')
  const [passMsg, setPassMsg] = useState('')
  const [confirmPassMsg, setConfirmPassMsg] = useState('')
  const [msg, setMsg] = useState('')
  
  const [isEmailMsgVisible, setIsEmailMsgVisible] = useState(false)
  const [isFirstnameMsgVisible, setIsFirstnameMsgVisible] = useState(false)
  const [isLastnameMsgVisible, setIsLastnameMsgVisible] = useState(false)
  const [isPassMsgVisible, setIsPassMsgVisible] = useState(false)
  const [isConfirmPassMsgVisible, setIsConfirmPassMsgVisible] = useState(false)
  const [isMsgVisible, setIsMsgVisible] = useState(false)

  // const registeredUser = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const registValid = (e) => {
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

    if (!firstname) {
      setIsFirstnameMsgVisible(true)
      setFirstnameMsg("Nama depan harus diisi")
    } else {
      setIsFirstnameMsgVisible(false)
    }

    if (!lastname) {
      setIsLastnameMsgVisible(true)
      setLastnameMsg("Nama belakang harus diisi")
    } else {
      setIsLastnameMsgVisible(false)
    }

    if (!pass) {
      setIsPassMsgVisible(true)
      setPassMsg("Password harus diisi")
    } else if (pass.length < 8) {
      setIsPassMsgVisible(true)
      setPassMsg("Password minimal 8 karakter")
    } else {
      setIsPassMsgVisible(false)
    }

    if (!confirmPass) {
      setIsConfirmPassMsgVisible(true)
      setConfirmPassMsg("Ketik ulang password anda")
      return
    } else if (confirmPass !== pass) {
      setIsConfirmPassMsgVisible(true)
      setConfirmPassMsg("Password tidak sama")
      return
    } else {
      setIsConfirmPassMsgVisible(false)
    }

    // demo only: checking email from redux store
    // if (registeredUser?.email === email) {
    //   setIsMsgVisible(true)
    //   setMsg("Email sudah terdaftar. Silahkan login")
    //   return
    // } else {
    //   setIsMsgVisible(true)
    //   setMsg('Registrasi sukses. Silahkan login')
    // }

    // API integration
    fetch(`${apiUrl}/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email, 
        first_name: firstname,
        last_name: lastname,
        password: pass,
      }),
    })
      .then(async (res) => {
        const text = await res.text();
        let data;
      
        try {
          data = JSON.parse(text);
        } catch (err) {
          throw new Error ('Server returned non-JSON: ' + text);
        }
      
        if (!res.ok) {
          throw new Error(data.message || 'Registrasi gagal');
        }
      
        dispatch(storeUserInfo({
          user: { 
            email: data.email, 
            firstname: data.first_name, 
            lastname: data.last_name 
          }
        }));

    setMsg('Registrasi berhasil. Silahkan login');
    setIsMsgVisible(true);
  })
  .catch((err) => {
    console.error(err);
    setMsg(err.message);
    setIsMsgVisible(true);
  });


    setEmail('')
    setFirstname('')
    setLastname('')
    setPass('')
    setConfirmPass('')
  }

  const resetValue = () => {
    setIsMsgVisible(false)
    setMsg('')
  }

  return (
    <div className='flex flex-col gap-10'>
      <div>
        <div className='text-2xl text-center font-bold my-2 px-30'>Lengkapi data untuk membuat akun</div>
        <form onSubmit={registValid} className='flex flex-col gap-2 mt-10 mb-5 px-10'>
          <label htmlFor="email" hidden ></label>
          <div className={`flex flex-row items-center gap-2 p-3 input w-full ${isEmailMsgVisible ? "border-[#f03c2e]" : "border-[#c6c0c0]"}`}>
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
          <p className={`error-msg text-right ${isEmailMsgVisible ? "visible" : "invisible"}`}>{emailMsg}</p>
          <label htmlFor="firstname" hidden ></label>
          <div className={`flex flex-row items-center gap-2 p-3 input w-full ${isFirstnameMsgVisible ? "border-[#f03c2e]" : "border-[#c6c0c0]"}`}>
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
          <p className={`error-msg text-right ${isFirstnameMsgVisible ? "visible" : "invisible"}`}>{firstnameMsg}</p>
          <label htmlFor="lastname" hidden ></label>
          <div className={`flex flex-row items-center gap-2 p-3 input w-full ${isLastnameMsgVisible ? "border-[#f03c2e]" : "border-[#c6c0c0]"}`}>
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
          <p className={`error-msg text-right ${isLastnameMsgVisible ? "visible" : "invisible"}`}>{lastnameMsg}</p>
          <label htmlFor="pass" hidden ></label>
          <div className={`flex flex-row items-center gap-2 p-3 input w-full ${isPassMsgVisible ? "border-[#f03c2e]" : "border-[#c6c0c0]"}`}>
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
          <p className={`error-msg text-right ${isPassMsgVisible ? "visible" : "invisible"}`}>{passMsg}</p>
          <label htmlFor="confirmpass" hidden ></label>
          <div className={`flex flex-row items-center gap-2 p-3 input w-full ${isConfirmPassMsgVisible ? "border-[#f03c2e]" : "border-[#c6c0c0]"}`}>
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
              <img src={HideIcon} alt="Hide password" onClick={() => setIsConfirmPassVisible(false)} className='w-[15px] h-[15px] cursor-pointer' />
            ) : (
              <img src={SeeIcon} alt="See password" onClick={() => setIsConfirmPassVisible(true)} className='w-[15px] h-[15px] cursor-pointer' />
            )}
          </div>
          <p className={`error-msg text-right ${isConfirmPassMsgVisible ? "visible" : "invisible"}`}>{confirmPassMsg}</p>
          <button 
              type='submit' 
              className='button my-3 w-full'>
                  Registrasi
          </button>
        </form>
        <div className='text-xs text-center text-[#c6c0c0] font-semibold'>Sudah punya akun? Login <span onClick={() => navigate('/login')} className='text-[#f03c2e] font-bold cursor-pointer'>di sini</span></div>
      </div>
      <div 
        className={`status-msg ${isMsgVisible ? "visible" : "invisible"}`}>
          <div>{msg}</div>
          <div onClick={resetValue} className='cursor-pointer'>x</div>
      </div>
    </div>
  )
}

export default Regist
