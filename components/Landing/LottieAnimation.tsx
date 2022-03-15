import Lottie from "lottie-web";
import { Box } from "@chakra-ui/react";
import React, { createRef, useEffect } from "react";
// find available options @ https://airbnb.io/lottie/#/web
export default function LottieAnimation({ options, ...props }) {
  let lottieAnimation = createRef<HTMLDivElement>();

  useEffect(() => {
    Lottie.loadAnimation({
      container: lottieAnimation.current,
      ...options,
    });
  }, []);

  return <Box {...props} ref={lottieAnimation}></Box>;
}
