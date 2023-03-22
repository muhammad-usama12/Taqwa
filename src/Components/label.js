import React from "react";
import { Heading, Mark } from "@chakra-ui/react";

export default function Label(props) {
  return (
    <Heading lineHeight="tall" color={"whiteAlpha.500"} zIndex={999}>
      <Mark
        color={"black"}
        bg={"white"}
        fontFamily={"NewYork"}
        px={2}
        py={1}
        query={props.first}
      >
        {props.first}
      </Mark>
      <Mark
        color={"white"}
        bg={"black"}
        fontFamily={"NewYork"}
        px={2}
        py={1}
        query={props.last}
      >
        {props.last}
      </Mark>
    </Heading>
  );
}
