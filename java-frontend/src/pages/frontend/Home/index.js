import { Outlet } from "react-router-dom";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from "./Slider";
import Product from "../Product";

const Home = () => {
  return (
    <>
       <main className="wrapperMain_content">
        <Slider/>
      
      </main>
    </>
  )
};

export default Home;