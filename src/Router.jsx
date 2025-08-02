import React from 'react'
import { Routes, Route } from 'react-router'
// import PrivateRoute from './PrivateRoute'

import Dashboard from './pages/Dashboard'
import Home from './components/Home/Home'
import Topup from './components/Topup/Topup'
import Transaction from './components/Transaction/Transaction'
import History from './components/Transaction/History'
import ShowMore from './components/Transaction/ShowMore'

import AuthPage from './pages/AuthPage'
import Login from './components/Auth/Login'
import Regist from './components/Auth/Regist'

import ProfilePage from './pages/ProfilePage'
import Profile from './components/Profile/Profile'
import Edit from './components/Profile/Edit'

function Router() {
  return (
    <Routes>
        <Route path="/" element = {<Dashboard />}>
            <Route index element = {<Home />} />
            {/* <Route element={<PrivateRoute />}> */}
              <Route path="topup" element = {<Topup />} />
              <Route path="transaction" element = {<Transaction />} />
              <Route path="transaction/history" element = {<History />} />
              <Route path="transaction/all" element = {<ShowMore />} />
            {/* </Route> */}
        </Route> 

        <Route element = {<AuthPage/>}>
            <Route path="login" element= {<Login />} />
            <Route path="registration" element = {<Regist />} />
        </Route>

        {/* <Route element = {<PrivateRoute />} > */}
            <Route element = {<ProfilePage/>}>
                <Route path="profile" element= {<Profile />} />
                <Route path="profile/update" element = {<Edit />} />
            </Route>
        {/* </Route> */}
    </Routes>
  )
}

export default Router
