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
import LoginPage from "./components/LoginPage";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";

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
          {/* </>
        ) : ( */}
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
