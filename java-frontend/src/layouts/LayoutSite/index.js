import { Outlet } from "react-router-dom";
import './LayoutSite.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from "./Footer";
import Header from "./Header";
import Home from "../../pages/frontend/Home";
import '../../font/font.css';
const LayoutSite = () => {
  
  return (
    <>
      <div className="mainBody-theme-container mainBody-modalshow">
        <Header/>
       
       <Outlet/>

      <Footer/>

      </div>


      
    </>
  )
};

export default LayoutSite;