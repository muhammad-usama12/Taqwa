import React, { useState, useEffect } from "react";
import "./index.scss";
import axios from "axios";

export default function PrayerTable(props) {
  const [location, setLocation] = useState({ longitude: null, latitude: null });
  const [data, setData] = useState([]);
  const [timings, setTimings] = useState({});
  const [date, setDate] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =
          await axios.get(`https://api.aladhan.com/v1/calendar/${new Date().getFullYear()}/${
            new Date().getMonth() + 1
          }?latitude=${location.latitude}&longitude=${
            location.longitude
          }&method=2
          `);
        const mainData = response.data.data[`${new Date().getDate() - 1}`];
        const date = mainData.date;

        console.log("DATA FETCHED:", mainData);
        setTimings(mainData.timings);

        // for (const x in timings) {
        //   const value = timings[x];
        //   console.log(x, value);
        // }
        setDate(mainData.date);
        // console.log("TODAY'S TIMINGS:", timings);
        // console.log("CURRENT DATE DATA:", date);
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

  const prayerTable = Object.entries(timings).map(([key, value]) => {
    if (key === "Fajr" || key === "Dhuhr") {
      return <div>{`${key}: \n ${value.substr(0, 5).concat(" AM ")}`}</div>;
    }
    if (key === "Asr" || key === "Maghrib" || key === "Isha") {
      return <div>{`${key}: ${value.substr(0, 5).concat(" PM ")}`}</div>;
    }
  });

  return <div>{prayerTable}</div>;
}
