import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";

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
  return <Box>{date.toLocaleTimeString()}</Box>;
}
