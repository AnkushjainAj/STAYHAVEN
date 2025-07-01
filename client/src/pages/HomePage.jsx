import React from "react";
import Banner from "../components/Banner";
import DreamVacation from "../components/DreamVacation";
import NextTrip from "../components/NextTrip";
import Hotels from "../components/Hotels";

import Activities from "./Activities";
import About from "./About";

const HomePage = () => {
  return (
    <div>
      
      <Banner />
      <DreamVacation />
      <NextTrip />
     
      <Hotels />
      <About/>
       <Activities/>
    </div>
  );
};

export default HomePage;
