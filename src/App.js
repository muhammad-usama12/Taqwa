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
      <PrayerTable />
      <Box />
      <Footer />
    </>
  );
}

export default App;
