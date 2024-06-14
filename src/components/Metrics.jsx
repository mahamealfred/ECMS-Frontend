import React, { useEffect, useState } from "react";

import Navbar from "./Navbar";
import DailyMetric from "./DailyMetric";
import TrendingTracks from "./TrendingTracks";
import StaffTrendingTracks from "./StaffTrendingTracks";
import TrendingUsers from "./TrendingUsers";
import ComplaintMetric from "./ComplaintMetric";
import UserActivity from "./UserActivity";
import { fetchAllComplaints, fetchAllComplaintsById } from "../apis/complaintController";
import { useAuth } from "../context/AuthContext";
import MyBarChart from "./charts/BarChart";
function Metrics() {
  const [complaintData, setComplaintData] = useState([]);
  const { userInfo } = useAuth()

  //Fecth Category
  const fetchComplaint = async () => {
    try {
      const response = await fetchAllComplaints();
      if (response.responseCode === 200) {
        setComplaintData(response.data)
      }

    } catch (error) {
      return error
    }
  }
  const fetchComplaintByStaff = async () => {
    try {
      const response = await fetchAllComplaintsById(JSON.parse(userInfo)?.id);
      if (response.responseCode === 200) {
        setComplaintData(response.data)
      }

    } catch (error) {
      return error
    }
  }
  useEffect(async () => {
    if (complaintData.length < 1) {
      if (JSON.parse(userInfo)?.role === "Admin") {
        await fetchComplaint()
      } else {
        await fetchComplaintByStaff()
      }


    }
  }, []);

  return (
    <div className="metrics">
      <Navbar />
      {
        JSON.parse(userInfo)?.role === "Admin" ? (
          <>
            <div className="grid-one">
              <DailyMetric />
              <ComplaintMetric />
            </div>
            <div className="grid-two">
              <MyBarChart complaintData={complaintData} />
              {/* <UserActivity complaintData={complaintData}/> */}
              {/* <TrendingTracks complaintData={complaintData}/> */}
              {/* <StaffTrendingTracks complaintData={complaintData}/> */}
              {/* <TrendingUsers /> */}

            </div>
          </>
        ) : (
          <>
            <div className="grid-one">
              {/* */}
              <ComplaintMetric />
              <DailyMetric />
            </div>

            <div className="grid-two">
              <MyBarChart complaintData={complaintData} />
              {/* <UserActivity complaintData={complaintData}/> */}
              {/* <TrendingTracks complaintData={complaintData}/> */}
              <TrendingTracks complaintData={complaintData}/>
              {/* <TrendingUsers /> */}
        
            </div>
          </>
        )


      }

    </div>
  );
}

export default Metrics;
