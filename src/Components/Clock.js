import { useState, useEffect } from "react";
import { Box, Mark } from "@chakra-ui/react";

export default function Clock() {
  const [date, setDate] = useState(new Date());

  function clockReset() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(clockReset, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
  return (
    <Box textAlign={"center"} fontSize={"3xl"} color={"whiteAlpha.900"}>
      <Mark bg="gray.900" color="gray.100">
        {date.toLocaleTimeString()}
      </Mark>
    </Box>
  );
}
