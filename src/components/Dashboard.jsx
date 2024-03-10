import React, {  Component } from "react";
import Metrics from "./Metrics";
import Sidebar from "./Sidebar";
import "../scss/Styles.scss";

export default class Dashboard extends  Component{
    render(){
        return (
<div className="dashboard">
      <Sidebar />
      <Metrics />
    </div>
        );
    
    }
}

