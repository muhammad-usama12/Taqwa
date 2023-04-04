import React from "react";
import { Heading, Mark } from "@chakra-ui/react";
import "./label.scss";

export default function Label(props) {
  return (
    <Heading lineHeight="tall" zIndex={999}>
      <Mark
        bg={"whiteAlpha.900"}
        fontFamily={""}
        px={2}
        py={1}
        query={props.first}
      >
        {props.first}
      </Mark>
      <Mark
        color={"whiteAlpha.900"}
        fontFamily={""}
        px={2}
        py={1}
        query={props.last}
      >
        {props.last}
      </Mark>
    </Heading>
  );
}
