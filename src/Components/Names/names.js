import { Box, Container, Divider } from "@chakra-ui/react";
import React from "react";
import Label from "../label";

export default function Names() {
  return (
    <>
      <Container centerContent>
        <br></br>
        <Label first={"99 Names Of"} last={"Allah"} />
        <Box
          margin={"20px"}
          maxW={{ base: "100%", sm: "400px", md: "600px", lg: "800px" }}
          p={4}
          zIndex={10000}
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
          ALLAH NAMES
          <Divider pt={"5"} />
        </Box>
      </Container>
    </>
  );
}
