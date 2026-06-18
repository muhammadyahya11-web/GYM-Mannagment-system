import React, { useContext } from 'react'
import Sidebar from './Sidebar/Sidebar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import GymProfile from './Owner/Pages/GymProfile'
import AllPayments from './Owner/Pages/AllPayments'
import Members from './Owner/Pages/Member'
import Attendance from './Owner/Pages/Attendence'
import MonthlyReport from './Owner/Pages/MonthlyRepors'
import YearlyReports from './Owner/Pages/YearlyReports'
import PendingPayments from './Owner/Pages/PendingPayments'

import Trainers from './Owner/Pages/Trainers'
import Setting from './Owner/Pages/Setting'
import Addtrainer from './Owner/Component/Addtrainer'
import AddMember from './Owner/Component/Addmember'
import PayFee from './User/NewAdmission'
import RenewMembership from './User/RenewMembership'
import DaietPlane from './User/DaietPlane'
import AITrainer from './User/AITrainer'
import WorkoutPlane from './User/WorkoutPlane'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react'


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
import ResetPassword from './Auth/ResetPassword'
import PaymentSuccess from './User/PaymentSuccess'


function App() {
   
   const { sidebarOpen , isMobile ,token ,user, setUser ,  } = useContext(MainContext)
   const nav = useNavigate()
    useEffect(() => {
       
    }, [token])
    
    const renderDashboard = () => {
      if (user === "owner") return <OwnerDashboard />
      if (user === "client") return <UserDashboard />
      return <UserDashboard />
    }
    
    return (
    <  >
    <div className='overflow-x-hidden '></div>
      
      { !token ?  
     <Routes>

             <Route>
               <Route path="/" element={<Register />} />
                 <Route path="/login" element={<Login />} />
                  <Route path='/verify' element={<OtpVerify />} />
                  <Route path='/forgot-password' element = { <ForgotPassword /> } />
                  
             </Route>
           </Routes>  :
      <div className='flex w-full '>
        <div className='bg-[#0e1424]'>
        
         {!isMobile && <Sidebar />}
          {isMobile && sidebarOpen && <Sidebar />}
        
        </div>

        <div className='w-full'>
             <Navbar />
             {/*==========================ROUTES======================================  */}
             <Routes> 
                <Route path='/reset-password/:token' element = { <ResetPassword /> } />
                <Route path='/payment-success' element={<PaymentSuccess />} />
                <Route path='/user/payment-success' element={<PaymentSuccess />} />
                
                <Route path="/" element={renderDashboard()} />
                <Route path="/owner/gym-profile" element={<GymProfile />} />
                <Route path='/owner/trainer' element={<Trainers />} />
                <Route path='/owner/membership-plans' element={<MembershipPlans />} />
                <Route path='/owner/payments/all' element={<AllPayments />} />
                <Route path='/owner/member' element={<Members />} />
                <Route path='/owner/attendance' element={<Attendance />} />
                <Route path='/owner/reports/monthly' element={<MonthlyReport />} />
                <Route path='/owner/reports/yearly' element={<YearlyReports />} />
                <Route path='/owner/setting' element={<Setting />} />
                <Route path='/owner/addtrainer' element={<Addtrainer />} />
                <Route path='/owner/addtrainer/:id' element={<Addtrainer />} />
                <Route path='/owner/addmember' element={<AddMember />} />
                 <Route path='/owner/payments/pending' element={<PendingPayments />} />


                <Route path='/user/membership/payfee' element={<NewAdmission />} />
                <Route path='/user/membership/renew' element={<RenewMembership />} />
                <Route path='/user/daietplane' element={<DaietPlane />} />
                <Route path='/user/workoutplane' element={<UserWorkout />} />
                <Route path='/user/AI-trainer' element={<AITrainer />} />
                <Route path='/user/attendence' element={<UserAttendanceQRCode />} />
                <Route path='/user/chat-trainer' element={<TrainerChat/>} />
                <Route path='/user/progress' element={<UserProgress/>} />
                <Route path='/user/setting' element={<UserSettings/>} />

             </Routes>
        </div>
      </div> }
      <ToastContainer />
    </>
  )
}

export default App