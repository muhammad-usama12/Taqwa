import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PrayerTable(props) {
  const [location, setLocation] = useState({ longitude: null, latitude: null });
  const [filter, setFilter] = useState([]);
  const [data, setData] = useState([]);
  const [date, setDate] = useState([]);

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
        const filteredDate = filter.data[`${new Date().getDate() - 1}`];
        setFilter(response.data);
        setData(filteredDate);
        console.log("DATA FETCHED:", data.timings);
        console.log("CURRENT DATE DATA:", filteredDate.date);
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
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {/* {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.age}</td>
          </tr>
        ))} */}
      </tbody>
    </table>
  );
}
