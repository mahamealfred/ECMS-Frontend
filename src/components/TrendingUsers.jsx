import React from "react";
import { BsArrowRight } from "react-icons/bs";

import trend1 from "../assets/trending1.png";
import trend2 from "../assets/trending2.png";
import trend3 from "../assets/trending3.png";

function TrendingUsers() {
  return (
    <div className="trending__users">
      <div className="trending__info">
        <div>
          <h3>Recent Complaints</h3>
          {/* <span>Today</span> */}
        </div>
        <div className="icon">
          <BsArrowRight />
        </div>
      </div>
      <div className="trend">
        {/* <img src={trend1} alt="" /> */}
        <div className="trend__info">
          <h4></h4>
          <span></span>
        </div>
      </div>
      <div className="trend">
        {/* <img src={trend2} alt="" /> */}
        <div className="trend__info">
          <h4></h4>
          <span>Air polution</span>
        </div>
      </div>
      <div className="trend">
        {/* <img src={trend3} alt="" /> */}
        <div className="trend__info">
          <h4></h4>
          <span>Water Disposal</span>
        </div>
      </div>
    </div>
  );
}

export default TrendingUsers;
