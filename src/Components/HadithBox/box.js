import React, { useState, useEffect } from "react";
import "./box.scss";
import axios from "axios";
import { Box, Button } from "@chakra-ui/react";
import Label from "../label";
import Clock from "../Clock";

export default function HadithBox(props) {
  const [data, setData] = useState("");
  const [filter, setFilter] = useState("");
  const [meta, setMeta] = useState("");
  const [random, setRandom] = useState(Math.floor(Math.random() * 7563));

  const handleClick = async () => {
    newHadith();
  };

  useEffect(() => {
    const fetchHadith = async () => {
      const res = await axios.get(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-muslim.json"
      );
      const filter = res.data.hadiths[random - 1];
      setFilter(filter);
    };
    fetchHadith();
  }, [random]);

  const newHadith = () => {
    const randomNum = Math.floor(Math.random() * 7563);
    setRandom(randomNum);
  };

  useEffect(() => {
    if (filter) {
      setData(filter.text);
      setMeta(
        `Book: ${filter.reference.book} Hadith: ${filter.reference.hadith}`
      );
    }
  }, [filter]);

  return (
    <div>
      <Label first={"Hadith"} last={"Of The Day"} />
      <Box
        mt={"40px"}
        padding={"12"}
        textAlign={"center"}
        className="hadith-container"
        color="whiteAlpha.900"
        w={"1000px"}
        h={"300px"}
        bg="transparent"
        borderColor={"red"}
        borderWidth="1px"
        borderRadius="lg"
        letterSpacing="widest"
        fontSize="lg"
        textTransform="uppercase"
      >
        {data}
        <h6>{meta}</h6>
        <Button
          colorScheme={"blackAlpha"}
          color={"GrayText"}
          onClick={handleClick}
        >
          Next Hadith
        </Button>
      </Box>

      <br></br>
    </div>
  );
}
