import React, { useEffect, useState } from "react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { fetchAllComplaints } from "../apis/complaintController";

const data = [
  {
    view: 1000,
  },
  {
    view: 1200,
  },
  {
    view: 1500,
  },
  {
    view: 1780,
  },
  {
    view: 1990,
  },
  {
    view: 2190,
  },
  {
    view: 2490,
  },
  {
    view: 2200,
  },
  {
    view: 2300,
  },
  {
    view: 2500,
  },
  {
    view: 2380,
  },
  {
    view: 2290,
  },
  {
    view: 2190,
  },
  {
    view: 1990,
  },
  {
    view: 2200,
  },
  {
    view: 2400,
  },
  {
    view: 2200,
  },
  {
    view: 2580,
  },
  {
    view: 2790,
  },
  {
    view: 3090,
  },
  {
    view: 3290,
  },
  {
    view: 3300,
  },
  {
    view: 3400,
  },
  {
    view: 3500,
  },
  {
    view: 3780,
  },
  {
    view: 3390,
  },
  {
    view: 3190,
  },
  {
    view: 2490,
  },
  
];

function DailyMetric() {
  const [complaintData, setComplaintData] = useState([])



  let dateRange = "No data available";
  let chartData 
  // Check if responseArray has elements
  if (complaintData.length > 0) {
    // Map responseArray data to match the format of your existing chart data
     chartData = complaintData.map((item) => ({
      date: item.createdAt,
      view: parseInt(item.totalParcentage), // Assuming totalParcentage holds the data you want to display
    }));

    // Extract start and end dates from the response array
    const startDate = new Date(complaintData[0].createdAt);
    const endDate = new Date(complaintData[complaintData.length - 1].createdAt);

    // Format the dates as desired (e.g., September 2021 - October 2021)
    const formattedStartDate = startDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    const formattedEndDate = endDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    dateRange = `${formattedStartDate} - ${formattedEndDate}`;
  }


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
    <div className="top__card">
      <h3>Daily Complaints</h3>
      <span>{dateRange}</span>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorview" x1="0" y1="0" x2="0" y2="1">
              <stop offset="30%" stopColor="#8884d8" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#ff9bff81" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <Tooltip 
            labelFormatter={(value) => `Date: ${value}`}
            formatter={(value, name, props) => [`${props.payload.date}: ${value} %`, name]}
          />
          <Area
            type="monotone"
            dataKey="view"
            stroke="#8884d8"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorview)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DailyMetric;
