import React from "react";
import "./App.scss";
import Footer from "./Components/Footer/Footer";
import PrayerTable from "./Components/PrayerTable";
import Background from "./Background";
import HadithBox from "./Components/HadithBox/box";
import Names from "./Components/Names/names";

function App() {
  return (
    <div className="components">
      <Names />
      <div className="prayer-comp"></div>
      <div className="compass-comp">
        {/* <Compass /> */}
        <Background />
      </div>
      <PrayerTable />
      {/* <HadithBox /> */}

      {<Footer />}
    </div>
  );
}

export default App;
