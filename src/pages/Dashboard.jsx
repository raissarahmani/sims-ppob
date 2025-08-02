import React from 'react'
import { Outlet } from 'react-router'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import Welcome from '../components/Home/Welcome'
import Balance from '../components/Home/Balance'

const apiUrl = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [balance, setBalance] = useState(0)
  const token = useSelector((state) => state.auth.token)
  useEffect(() => {
      fetch(`${apiUrl}/balance`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      .then(async (res) => {
        console.log("Status code:", res.status)
        const data = await res.json()
        console.log("Balance response:", data)
        if (!res.ok) {
          throw new Error(data.msg || 'Gagal menampilkan saldo')
        }
  
        setBalance(data.data.balance)
      })
      .catch((err) => {
        console.error(err)
      })
    }, [token])
  return (
    <div>
      <Header />
      <div className='flex flex-row gap-10 justify-between px-30 pt-10 pb-5 h-full'>
        <Welcome />
        <Balance balance={balance} />
      </div>
      <Outlet />
    </div>
  )
}

export default Dashboard
