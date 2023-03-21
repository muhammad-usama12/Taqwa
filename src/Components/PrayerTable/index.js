import React, { useState, useEffect } from "react";
import "./prayerTable.scss";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import moment from "moment";

export default function PrayerTable(props) {
  const [location, setLocation] = useState({ longitude: null, latitude: null });
  const [timings, setTimings] = useState({});
  const [date, setDate] = useState({});
  const [loading, setLoading] = useState(true);

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
        // setDate(mainData.date);
        setDate(
          `${mainData.date.hijri.month.en} ${mainData.date.hijri.month.number}, ${mainData.date.hijri.year}`
        );
        setTimings(mainData.timings);

        setLoading(false);
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
          <td>{key}</td>
          <td>{value.substr(1, 5).concat(" AM")}</td>
        </Tr>
      );
    }
    if (
      key === "Dhuhr" ||
      key === "Asr" ||
      key === "Maghrib" ||
      key === "Isha"
    ) {
      const timeConversion = `${(
        +value.replace("(EDT)", "").replace(":", "") - 1200
      ).toString()}`;
      const newTime =
        timeConversion.substring(0, 1) +
        ":" +
        timeConversion.substring(1) +
        " PM";

      return (
        <Tr>
          <td>{key}</td>
          <td>{newTime}</td>
        </Tr>
      );
    }
    return null;
  });
  //   );

  const gregorianTime = moment().format("LL");

  return (
    <section className="container">
      <TableContainer>
        {loading ? (
          <Spinner
            thickness="5px"
            speed="0.75s"
            emptyColor="gray.200"
            color="teal.500"
            size="xl"
          />
        ) : (
          <Table variant="striped" colorScheme="gray">
            <caption>{gregorianTime}</caption>
            <caption>{date}</caption>
            <TableCaption>{""}</TableCaption>
            <Thead>
              <Tr className="heading">
                <Th>Prayer</Th>
                <Th>Times</Th>
              </Tr>
            </Thead>
            <Tbody className="structure">{prayerTable}</Tbody>
          </Table>
        )}
      </TableContainer>
      {/* <h4>{engDate}</h4> */}
    </section>
  );
}
