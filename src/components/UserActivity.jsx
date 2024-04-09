import React from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BsThreeDots } from "react-icons/bs";

const data = [
  {
    name: "Mo",
    songDiscovered: 4000,
    songListened: 2400,
  },
  {
    name: "Tu",
    songDiscovered: 3000,
    songListened: 1398,
  },
  {
    name: "We",
    songDiscovered: 2000,
    songListened: 9800,
  },
  {
    name: "Th",
    songDiscovered: 2780,
    songListened: 3908,
  },
  {
    name: "Fr",
    songDiscovered: 1890,
    songListened: 4800,
  },
  {
    name: "Sa",
    songDiscovered: 2390,
    songListened: 3800,
  },
  {
    name: "Sun",
    songDiscovered: 3490,
    songListened: 4300,
  },
];
const mapComplaintsToChartData = (complaintsData) => {
  const dayCounts = {};
  complaintsData.forEach(complaint => {
    const date = new Date(complaint.createdAt);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    if (dayCounts[day]) {
      dayCounts[day]++;
    } else {
      dayCounts[day] = 1;
    }
  });

  // Convert day counts to chart data format
  const chartData = Object.keys(dayCounts).map(day => ({
    name: day,
    songDiscovered: dayCounts[day],
    songListened: dayCounts[day],
  }));

  return chartData;
};

function UserActivity(complaintData) {
 
  const chartData = mapComplaintsToChartData(complaintData.complaintData);

  return (
    <div className="user__activity">
      <div className="user__activity__info">
        <div>
          <h3>Complaint by Category</h3>
          {/* <span>New Tracks</span> */}
        </div>
        <div className="icon">
          <BsThreeDots />
        </div>
      </div>
      <ResponsiveContainer width="100%" height="70%">
        <BarChart data={chartData}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <Tooltip />
          <Bar dataKey="songDiscovered" stackId="a" fill="#4361ee" />
          <Bar
            radius={[7, 7, 0, 0]}
            dataKey="songListened"
            stackId="a"
            fill="#48bfe3"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UserActivity;
