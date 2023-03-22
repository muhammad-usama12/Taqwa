import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Compass.scss";
import Label from "../label";

export default function Compass() {
  const [location, setLocation] = useState({ longitude: null, latitude: null });
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://api.aladhan.com/v1/qibla/${location.latitude}/${location.longitude}`
        );
        const direction = res.data.data.direction;
        setAngle(direction);
        console.log(direction);
      } catch (err) {
        console.log("ERROR:", err);
      }
    };

    const getLocation = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

    const fetchDataWithLocation = async () => {
      try {
        const position = await getLocation();

        const { latitude, longitude } = position.coords;
        setLocation({ longitude, latitude });
        console.log("LOCATION:", latitude, longitude);
      } catch (error) {
        console.log("Error getting location:", error);
      }
    };

    if (location.latitude === null && location.longitude === null) {
      fetchDataWithLocation();
    } else {
      fetchData();
    }
  }, [location]);

  return (
    <div className="compass-div">
      <svg viewBox="0 0 100 100" className="compass">
        <circle cx="50" cy="50" r="45" className="compass-background" />

        <line
          x1="50"
          y1="50"
          x2="50"
          y2="30"
          className="compass-indicator"
          style={{ transform: `rotate(${angle}deg)` }}
        />
        <polygon
          points="48,30 50,25 52,30"
          className="compass-indicator"
          style={{ transform: `rotate(${angle}deg)` }}
        />

        <text x="50" y="15" textAnchor="middle" className="compass-north">
          N
        </text>
        <text x="50" y="85" textAnchor="middle" className="compass-south">
          S
        </text>
        <text x="85" y="50" textAnchor="middle" className="compass-east">
          E
        </text>
        <text x="15" y="50" textAnchor="middle" className="compass-west">
          W
        </text>
      </svg>
      <Label first={"Qibla"} last={"Direction"} />
    </div>
  );
}
