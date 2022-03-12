import Lottie from "lottie-web";
import { Box } from "@chakra-ui/react";
import React, { createRef, useEffect } from "react";

export default function LottieAnimation({ animation, ...props }) {
  let lottieAnimation = createRef<HTMLDivElement>();

  useEffect(() => {
    const animate = Lottie.loadAnimation({
      container: lottieAnimation.current,
      animationData: animation,
    });
  }, []);

  return <Box {...props} ref={lottieAnimation}></Box>;
}
