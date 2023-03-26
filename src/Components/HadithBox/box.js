import React, { useState, useEffect } from "react";
import "./box.scss";
import axios from "axios";
import { Box, Container, Divider, Text } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import Label from "../label";

export default function HadithBox(props) {
  const [data, setData] = useState("");
  const [filter, setFilter] = useState("");
  const [meta, setMeta] = useState("");
  const [random, setRandom] = useState(Math.floor(Math.random() * 7563));

  const handleClick = async () => {
    console.log("CLICKED");
    newHadith();
  };
  const clicked = () => {
    console.log("CLICK TEST");
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
    <>
      <Container className="hadithBox" centerContent>
        <Label first={"Hadith"} last={"Of The Day"} />
        <Box
          margin={"20px"}
          display="inline-block"
          maxW={{ base: "100%", sm: "400px", md: "600px", lg: "800px" }}
          p={4}
          overflowWrap="break-word"
          mt={"40px"}
          padding={"12"}
          textAlign={"center"}
          className="hadith-container"
          color="whiteAlpha.900"
          bg="transparent"
          borderColor={"white"}
          borderWidth={"1px"}
          borderRadius="lg"
          letterSpacing="widest"
          fontSize="lg"
          textTransform="uppercase"
        >
          {data}

          <Divider margin={"20px"} />
          <Text margin={"20px"} align={"left"}>
            {meta}
          </Text>
        </Box>
        <Button
          zIndex={10000}
          colorScheme={"messenger.900"}
          onClick={handleClick}
        >
          Next Hadith
        </Button>
      </Container>
    </>
  );
}
