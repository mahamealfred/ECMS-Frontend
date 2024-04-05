import React, { useEffect, useState } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer, Legend } from "recharts";
import { BsThreeDots } from "react-icons/bs";
import { fetchAllComplaints } from "../apis/complaintController";

const data = [
  {
    name: "18-24",
    uv: 21.47,
    pv: 2400,
    fill: "#fdc5f5",
  },
  {
    name: "25-29",
    uv: 26.69,
    pv: 4567,
    fill: "#f7aef8",
  },
  {
    name: "30-34",
    uv: 15.69,
    pv: 1398,
    fill: "#b388eb",
  },
  {
    name: "35-39",
    uv: 28.22,
    pv: 9800,
    fill: "#82ca9d",
  },
  {
    name: "40-49",
    uv: 18.63,
    pv: 3908,
    fill: "#8093f1",
  },
  {
    name: "50+",
    uv: 24.63,

    fill: "#72ddf7",
  },
];
const categoryColors = ["#fdc5f5", "#f7aef8", "#b388eb", "#82ca9d", "#8093f1", "#72ddf7"];
function MusicMetric() {
  const [complaintData, setComplaintData] = useState([])
  const categoryCounts = {};

  // Step 2: Iterate over the array of complaints
  complaintData.forEach(complaint => {
    // Step 3: Extract the category name
    const categoryName = complaint.Category.name;

    // Step 4: Update the count for the category
    if (categoryCounts[categoryName]) {
      categoryCounts[categoryName]++;
    } else {
      categoryCounts[categoryName] = 1;
    }
  });
  const getRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
  };



  const environmentalData = Object.keys(categoryCounts).map((category, index) => ({
    name: category,
    uv: categoryCounts[category],
    fill: categoryColors[index % categoryColors.length], // Assign static colors
  }));
  //date
  
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
    <div className="music__metric">
      <div className="music__metric__info">
        <div>
          <h3>Complaints by Category </h3>
          <span>{dateRange}</span>
        </div>
        <div className="icon">
          <BsThreeDots />
        </div>
      </div>
      <ResponsiveContainer width="100%" height="80%">
      <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="10%"
          outerRadius="70%"
          data={environmentalData}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar minAngle={15} clockWise dataKey="uv" label={{ position: 'insideStart' }} />
          <Legend align="left" verticalAlign="bottom" layout="horizontal" />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MusicMetric;
