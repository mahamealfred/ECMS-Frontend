import React, { useEffect, useState } from "react";

import Navbar from "./Navbar";
import DailyMetric from "./DailyMetric";
import TrendingTracks from "./TrendingTracks";
import TrendingUsers from "./TrendingUsers";
import MusicMetric from "./MusicMetric";
import UserActivity from "./UserActivity";
import { fetchAllComplaints } from "../apis/complaintController";
import { useAuth } from "../context/AuthContext";
import MyBarChart from "./charts/BarChart";
function Metrics() {
  const [complaintData, setComplaintData] = useState([]);
  const {userInfo}=useAuth()
  
  //Fecth Category
  const fetchCategory = async () => {
    try {
      const response = await fetchAllComplaints();
      if (response.responseCode === 200) {
        setComplaintData(response.data)
      }
       
    } catch (error) {
      return error
    }
  }
  useEffect(async () => {
    if (complaintData.length < 1) {
      await fetchCategory()
        }
  }, []);

  return (
    <div className="metrics">
      <Navbar  />
      <div className="grid-one">
        <DailyMetric />
        <MusicMetric />
      </div>
     
      <div className="grid-two">
      <MyBarChart complaintData={complaintData}/>
      {/* <UserActivity complaintData={complaintData}/> */}
        <TrendingTracks complaintData={complaintData}/>
        <TrendingUsers />
    
      </div>
    </div>
  );
}

export default Metrics;
