import React, { useState, useEffect } from "react";
import "./prayerTable.scss";
import axios from "axios";
import { Table, Tbody, Tr, Td, TableContainer, Mark } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import moment from "moment";
import Label from "../Label/label";
import Clock from "../Clock";
import AnalogClock from "analog-clock-react";
import "../Label/label.scss";
import Compass from "../Compass/Compass";

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
        setDate(
          `${mainData.date.hijri.month.en} ${mainData.date.hijri.day}, ${mainData.date.hijri.year}`
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
          <Td className="glowEffect" fontWeight={"semibold"} fontSize={"14pt"}>
            {key}
          </Td>
          <Td className="glowEffect" fontSize={"14pt"}>
            {value.substr(1, 5).concat(" AM")}
          </Td>
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
          <Td className="glowEffect" fontWeight={"semibold"} fontSize={"14pt"}>
            {key}
          </Td>
          <Td className="glowEffect" fontSize={"14pt"}>
            {newTime}
          </Td>
        </Tr>
      );
    }
    return null;
  });
  //   );

  const gregorianDate = moment().format("LL");

  return (
    <section className="container">
      <Label first={"Prayer"} last={"Times"} />
      <TableContainer>
        {loading ? (
          <Spinner
            className="spinner"
            thickness="5px"
            speed="0.75s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          <Table variant="striped" colorScheme="blackAlpha" size={"md"}>
            <Tbody className="date" bg={"transparent"}>
              <Td>
                <Mark
                  bg="white"
                  color="black"
                  fontFamily="NewYork"
                  fontSize={"13pt"}
                  px="6"
                  py="3"
                >
                  {"Hijri Date"}
                </Mark>
                <Mark
                  bg="black"
                  color="white"
                  fontFamily="NewYork"
                  fontSize={"13pt"}
                  px="6"
                  py="3"
                >
                  {date}
                </Mark>
              </Td>

              <Td className="">
                <Mark
                  bg="white"
                  color="black"
                  fontFamily="NewYork"
                  fontSize={"13pt"}
                  px="6"
                  py="3"
                >
                  {"Gregorian Date"}
                </Mark>
                <Mark
                  bg="black"
                  color="white"
                  fontFamily="NewYork"
                  fontSize={"13pt"}
                  px="6"
                  py="3"
                >
                  {gregorianDate}
                </Mark>
              </Td>
            </Tbody>
            <div className="clock-comp">
              <ul>
                <li>
                  <Compass />
                </li>
                <li>
                  {" "}
                  <AnalogClock
                    border="true"
                    borderColor="#2e2e2e"
                    baseColor="#000000"
                    centerColor="#050505"
                    centerBorderColor="#ffffff"
                    handColors={"#c8c0c4"}
                    width={"300px"}
                  />
                  <Clock />
                </li>{" "}
              </ul>
            </div>

            <Tbody className="structure">{prayerTable}</Tbody>
          </Table>
        )}
      </TableContainer>
    </section>
  );
}
