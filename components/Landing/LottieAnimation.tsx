import Lottie from "lottie-web";
import { Box } from "@chakra-ui/react";
import React, { createRef, useEffect } from "react";

export default function LottieAnimation(props) {
  let lottieAnimation = createRef<HTMLDivElement>();

  useEffect(() => {
    const animate = Lottie.loadAnimation({
      container: lottieAnimation.current,
      animationData: props.animation,
    });
  }, []);

  return (
    <Box
      width={props.width}
      height={props.height}
      margin={props.margin}
      ref={lottieAnimation}
    ></Box>
  );
}
