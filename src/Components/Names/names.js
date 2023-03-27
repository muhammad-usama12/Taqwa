import { Box, Center, Container, Divider, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Label from "../Label/label";
import "../Label/label.scss";

export default function Names() {
  const [arabicName, newArabicName] = useState("");
  const [englishName, newEnglishName] = useState("");
  const [meaning, newMeaning] = useState("");
  const [desc, newDesc] = useState("");
  const [number, newNumber] = useState(Math.floor(Math.random() * 99) + 0);

  const randNum = Math.floor(Math.random() * 99);

  useState(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/KabDeveloper/99-Names-Of-Allah/main/99_Names_Of_Allah.json"
      )
      .then((res) => {
        newArabicName(res.data.data[randNum].name);
        newEnglishName(res.data.data[randNum].transliteration);
        newMeaning(res.data.data[randNum].en.meaning);
        newDesc(res.data.data[randNum].en.desc);
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  });

  return (
    <>
      <Container centerContent>
        <br></br>
        <Label first={"Names Of"} last={"Allah"} />
        <Box
          maxW={{ base: "100%", sm: "400px", md: "600px", lg: "800px" }}
          zIndex={10000}
          mt={"40px"}
          padding={"2"}
          textAlign={"center"}
          color="whiteAlpha.900"
          bg="transparent"
          borderColor={"white"}
          // borderWidth={"1px"}
          borderRadius="lg"
          letterSpacing="widest"
          fontSize="lg"
          textTransform="uppercase"
        >
          <Center height={"70px"} pr={"5px"}>
            <Text
              fontWeight={"extrabold"}
              fontSize={"5xl"}
              p={"5"}
              className="glowEffect"
            >
              {arabicName}
            </Text>
            <Divider orientation="vertical" pt={""} pl={""} />
            <Text
              fontWeight={"extrabold"}
              fontSize={"3xl"}
              p={"5"}
              className="glowEffect"
            >
              {englishName}
            </Text>
          </Center>
          <Divider pt={"5"} />
          <Text fontWeight={"extrabold"} fontSize={"lg"} p={"3"}>
            {meaning}
          </Text>
          <Text
            fontWeight={"extrabold"}
            fontStyle={"italic"}
            fontSize={"md"}
            p={"3"}
          >
            {desc}
          </Text>
        </Box>
      </Container>
    </>
  );
}
