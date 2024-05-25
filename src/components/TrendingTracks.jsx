import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { fetchAllComplaints } from "../apis/complaintController"; // Import the CSS file
import "./TrendingTracks.css"

function TrendingTracks({ complaintData }) {
  const groupComplaintsByCategoryAndStatus = () => {
    const groupedComplaints = {};

    complaintData?.complaintData?.forEach((complaint) => {
      const categoryName = complaint?.Category?.name;
      const status = complaint?.status;

      if (!groupedComplaints[categoryName]) {
        groupedComplaints[categoryName] = {};
      }

      if (!groupedComplaints[categoryName][status]) {
        groupedComplaints[categoryName][status] = 0;
      }

      groupedComplaints[categoryName][status]++;
    });

    return groupedComplaints;
  };

  const groupedComplaints = groupComplaintsByCategoryAndStatus();

  return (
    <div className="trending__tracks">
      <div className="trending__info">
        <div>
          <h3>Complaints Status</h3>
          <span></span>
        </div>
        <div className="icon">
          <BsArrowRight />
        </div>
      </div>
      {Object.keys(groupedComplaints).map((categoryName) => (
        <div key={categoryName} className="trend">
          <h4>{categoryName}</h4>
          <div className="status__counts">
            {Object.entries(groupedComplaints[categoryName])?.map(
              ([status, count]) => (
                <div className="status" key={status}>
                  <span>{status}:</span>
                  <span>{count}</span>
                </div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrendingTracks;
