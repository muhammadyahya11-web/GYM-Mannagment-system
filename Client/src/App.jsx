import React, { useContext } from 'react'
import Sidebar from './Sidebar/Sidebar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import GymProfile from './Owner/Pages/GymProfile'
import AllPayments from './Owner/Pages/AllPayments'
import Members from './Owner/Pages/Member'
import Attendance from './Owner/Pages/Attendence'
import MonthlyReport from './Owner/Pages/MonthlyRepors'
import YearlyReports from './Owner/Pages/YearlyReports'

import Trainers from './Owner/Pages/Trainers'
import Setting from './Owner/Pages/Setting'
import { useState ,useEffect } from 'react'
import PayFee from './User/NewAdmission'
import RenewMembership from './User/RenewMembership'
import DaietPlane from './User/DaietPlane'
import AITrainer from './User/AITrainer'
import WorkoutPlane from './User/WorkoutPlane'



import OwnerDashboard from './Owner/OwnerDasboard'
import MembershipPlans from './Owner/Pages/Membership'
import UserDashboard from './User/UserDashboar'
import TrainerChat from './User/Trainerchat'

import UserAttendanceQRCode from './User/UserAttendence'
import Progress from './User/Progress'
import UserSettings from './User/UserSetting'
import UserWorkout from './User/WorkoutPlane'
import NewAdmission from './User/NewAdmission'
import Register from './Auth/Register'
import Login from './Auth/Login'
import Navbar from './Navbar/Navbar'
import { MainContext } from './Maincontext/Context'
import OtpVerify from './Auth/Verification'
import UserProgress from './User/Progress'
import ForgotPassword from './Auth/forgotPassword'


function App() {
    
    const { sidebarOpen , isMobile ,tooken ,user, setUser , } = useContext(MainContext)
    const nav = useNavigate();
    

   
useEffect(() => {
   const handlenav =()=>{
    if(! tooken){ nav("/")}
   }
   if(tooken){
    if(user === "client"){nav("/user/dashboard")}
    if(user ==="trainer"){nav("/trainer/dashboard")}
    if(user==="owner"){nav("/owner/dashboard")}

   }
   handlenav()
 
}, [tooken , user])

   console.log('====================================');
   console.log(user);
   console.log('====================================');
    // ----------------------------------------------------------------------
  return (
    <  >
    <div className='overflow-x-hidden '></div>
     
      { !tooken ?  <Routes>

            <Route>
               <Route path="/" element={<Register />} />
                 <Route path="/login" element={<Login />} />
                  <Route path='/verify' element={<OtpVerify />} />
                  <Route path='/forgot-password;;' element = { <ForgotPassword /> } />
            </Route>
          </Routes>  :
      <div className='flex w-full '>
        <div className='bg-[#0e1424]'>
        
         {!isMobile && <Sidebar />}
          {isMobile && sidebarOpen && <Sidebar />}
        
        </div>

        <div className='w-full'>
             <Navbar />
            {/*==========================OWNER ROUTES======================================  */}
        { user==="owner" &&(
             <Routes> 
            <Route path='/owner/dashboard' element={<OwnerDashboard />} />
            <Route path="/owner/gym-profile" element={<GymProfile />} />
            <Route path='/owner/trainer' element={<Trainers />} />
            <Route path='/owner/membership-plans' element={<MembershipPlans />} />
            <Route path='/owner/payments/all' element={<AllPayments />} />
            <Route path='/owner/member' element={<Members />} />
            <Route path='/owner/attendance' element={<Attendance />} />
            <Route path='/owner/reports/monthly' element={<MonthlyReport />} />
            <Route path='/owner/reports/yearly' element={<YearlyReports />} />
            <Route path='/owner/setting' element={<Setting />} /> 
            </Routes> )
            }  

            {/* ==============================USER ROUTES===============================  */}
        {/* {
  user === "user" && ( */}
    <Routes>
      <Route path='/' element={<UserDashboard />} />
      <Route path="/user/membership/payfee" element={<NewAdmission />} />
      <Route path="/user/membership/renew" element={<RenewMembership />} />
      <Route path="/user/daietplane" element={<DaietPlane />} />
      <Route path="/user/workoutplane" element={<UserWorkout />} />
      <Route path="/user/AI-trainer" element={<AITrainer />} />
      <Route path="/user/attendence" element={<UserAttendanceQRCode />} />
      <Route path="/user/chat-trainer" element={<TrainerChat/>} />
      <Route path='/user/progress' element={<UserProgress/>} />
      <Route path='/user/setting' element={<UserSettings/>} />
    </Routes>
  {/* )
} */}
            {/* =============================TRAINER ROUTES =============================== */}


          


        </div>
      </div> }

    </>
  )
}

export default App
