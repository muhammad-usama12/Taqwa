import React, { useState, useEffect } from "react";
import "./App.scss";
import Footer from "./Components/Footer/Footer";
import PrayerTable from "./Components/PrayerTable";
import Background from "./Background";
import Compass from "./Components/Compass/Compass";
import HadithBox from "./Components/HadithBox/box";
import Names from "./Components/Names/names";

function App() {
  const [showFooter, setShowFooter] = useState(false);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // });

  // function handleScroll() {
  //   if (window.scrollY > 1 && showFooter) {
  //     setShowFooter(true);
  //   } else if (window.scrollY > 5 && showFooter) {
  //     setShowFooter(false);
  //   }
  // }

  return (
    <div className="components">
      {/* <img
        src="https://www.pngall.com/wp-content/uploads/2018/06/Allah-PNG.png"
        alt="Allah"
      /> */}

      <Names />
      <div className="prayer-comp"></div>
      <div className="compass-comp">
        {/* <Compass /> */}
        <Background />
      </div>
      <PrayerTable />
      <HadithBox />

      {showFooter && <Footer />}
    </div>
  );
}

export default App;
