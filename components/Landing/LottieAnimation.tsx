import { Box } from "@chakra-ui/react";
import Lottie from "lottie-web";
import React, { createRef, useEffect } from "react";

export default function LottieAnimation(props) {
  let lottieAnimation = createRef<HTMLDivElement>();

  useEffect(() => {
    const animate = Lottie.loadAnimation({
      container: lottieAnimation.current,
      animationData: props.animation,
    });
  }, []);

  return <Box ref={lottieAnimation}></Box>;
}
