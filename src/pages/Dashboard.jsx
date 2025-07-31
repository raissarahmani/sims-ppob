import React from 'react'
import { Outlet } from 'react-router'
import Header from '../components/Header'
import Welcome from '../components/Home/Welcome'
import Balance from '../components/Home/Balance'

function Dashboard() {
  return (
    <div>
      <Header />
      <div className='flex flex-row justify-between'>
        <Welcome />
        <Balance />
      </div>
      <Outlet />
    </div>
  )
}

export default Dashboard
