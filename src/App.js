import React, { useState, useEffect } from "react";
import Header from "./Components/Header/header";
import Box from "./Components/Posts/box";
import "./App.scss";
import Footer from "./Components/Footer/Footer";
import PrayerTable from "./Components/PrayerTable";

function App() {
  return (
    <>
      <Header />
      <br></br>
      <PrayerTable />
      <br></br>
      {/* <div className="box">
        <Box />
      </div> */}
      <Footer />
    </>
  );
}

export default App;
