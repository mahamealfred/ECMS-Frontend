import Metrics from "./components/Metrics";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home/Home";
import ScrollToTop from "./components/Home/ScrollToTop";
import "./scss/Styles.scss";
import Dashboard from "./components/Dashboard";
import UserList from "./components/UserList";
import CategoryList from "./components/CategoryList";
import ComplaintForm from "./components/ComplaintForm";
import ComplaintList from "./components/ComplaintList";
import QuestionList from "./components/QuestionList";
import OrganizationList from "./components/OrganizationList";
import PendingComplaintList from "./components/PendingComplaintList";
import DeliveredComplaintList from "./components/DeliveredComplaintList";
import LoginPage from "./components/LoginPage";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import SolvedComplaintList from "./components/SolvedComplaintList";
import StaffDeliveredComplaint from "./components/StaffDeliveredComplaint";
import StaffCanceledComplaint from "./components/StaffCanceledComplaint";
import StaffSolvedComplaint from "./components/StaffSolvedComplaint";

function App() {
  
  // const { auth, logout } = useAuth();
  const [auth,setAuth]=useState("")

  // useEffect(() => {
  //   // Set item in local storage when component mounts
  //  const token= localStorage.getItem('authkey');
  //  setAuth(token)
  // }, []);
  return (
    // <div>
    // <ScrollToTop />
    // <Home/>
    // </div>
    <AuthProvider>
<Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/complaint-form" element={<ComplaintForm />} />
        {/* {auth ? (
          <> */}
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/dashboard/users" element={<UserList />} />
          <Route path="/dashboard/complaint-categories" element={<CategoryList />} />
          <Route path="/dashboard/complaints" element={<ComplaintList />} />
          <Route path="/dashboard/pending-complaints" element={<PendingComplaintList/>}/>
          <Route path="/dashboard/delivered-complaints" element={<DeliveredComplaintList/>}/>
          <Route path="/dashboard/solved-complaints" element={<SolvedComplaintList/>}/>
          <Route path="/dashboard/new-delivered-complaints" element={<StaffDeliveredComplaint/>}/>
          <Route path="/dashboard/staff-canceled-complaints" element={<StaffCanceledComplaint/>}/>
          <Route path="/dashboard/staff-solved-complaints" element={<StaffSolvedComplaint/>}/>
          <Route path="/dashboard/organizations" element={<OrganizationList/>}/>
          <Route path="/dashboard/questions" element={<QuestionList/>}/>
          <Route path="/login" element={<LoginPage />} />
         {/* )}  */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>

    </AuthProvider>

  );
}

export default App;
