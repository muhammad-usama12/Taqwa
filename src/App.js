import React, { useState, useEffect } from "react";
import Header from "./Components/Header/header";
import Box from "./Components/Posts/box";
import "./App.scss";
import Footer from "./Components/Footer/Footer";

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log(latitude);
      console.log(longitude);
    });
  }, []);

  return (
    <>
      <Header />
      <Box longitude={longitude} latitude={latitude} />
      <Footer />
    </>
  );
}

export default App;
