import React from 'react'
import { Outlet } from 'react-router'
import Header from '../components/Header'
import Welcome from '../components/Home/Welcome'
import Balance from '../components/Home/Balance'

function Dashboard() {

  return (
    <div>
      <Header />
      <div className='flex flex-row gap-10 justify-between px-30 pt-10 pb-5 h-full'>
        <Welcome />
        <Balance />
      </div>
      <Outlet />
    </div>
  )
}

export default Dashboard
