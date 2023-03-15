import React, { useState, useEffect } from "react";
import "./prayerTable.scss";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import moment from "moment";

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
        setTimings(mainData.timings);
        setDate(mainData.date);
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
    if (key === "Fajr") {
      return (
        <Tr>
          {/* <td isNumeric>{key}</td> <td>{value.substr(0, 5).concat(" AM ")}</td> */}
          <td isNumeric>{key}</td> <td>{value.substr(1, 5).concat(" AM")}</td>
        </Tr>
      );
    }
    if (
      key === "Dhuhr" ||
      key === "Asr" ||
      key === "Maghrib" ||
      key === "Isha"
    ) {
      // console.log(value.replace("(EDT)", ""));
      let timeConversion = `${(
        +value.replace("(EDT)", "").replace(":", "") - 1200
      ).toString()}`;
      const newTime =
        timeConversion.substring(0, 1) +
        ":" +
        timeConversion.substring(1) +
        " PM";

      console.log(newTime);
      return (
        <Tr>
          <td>{key}</td>
          <td>{newTime}</td>
          {/* <td>{key}</td> <td>{`${value.substr(0, 5).concat(" PM ")}`}</td> */}
        </Tr>
      );
    }
    return null;
  });

  const test = Object.entries(date).map(([key, value]) => {
    return key || value;
  });

  // console.log(test);

  // const gregorianDate = date.gregorian;
  // const engDate = `${gregorianDate.month.en} ${gregorianDate.day}, ${gregorianDate.year}`;

  // console.log(gregorianDate);
  // console.log(date.hijri);

  // const dateObj = Object.entries(date).map(([key, value]) => {
  //   return `"KEY & VALUE:", ${(key, value)};`;
  // });
  // console.log(dateObj);

  return (
    <section className="container">
      <TableContainer>
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr className="heading">
              <Th>Prayer</Th>
              <Th>Times</Th>
            </Tr>
          </Thead>
          <Tbody className="structure">{prayerTable}</Tbody>
        </Table>
      </TableContainer>
      {/* <h4>{engDate}</h4> */}
    </section>
  );
}
