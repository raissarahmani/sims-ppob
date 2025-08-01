import React from 'react'
import { Outlet } from 'react-router'
import Header from '../components/Header'

function ProfilePage() {
  return (
    <div>
      <Header />
      <div className='px-50 py-10'>
        <Outlet />
      </div>
    </div>
  )
}

export default ProfilePage
