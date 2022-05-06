import React, { MouseEventHandler, useRef } from "react";
import {
  useMultiStyleConfig,
  Box,
  Text,
  BoxProps,
  Button,
} from "@chakra-ui/react";

interface IMultiContainerProps extends BoxProps {
  variant?:
    | "solid"
    | "gradient"
    | "ghost"
    | "button"
    | "bounty"
    | "status"
    | "created"
    | undefined;
  colorScheme?: string;
  size?: "prose" | "1/4" | "2/4" | "3/4" | "full";
  name?: string;
  onClick?: MouseEventHandler;
}

export const Chip: React.FC<IMultiContainerProps> = ({
  variant = undefined,
  colorScheme = undefined,
  size = undefined,
  children,
  onClick,
  name,
  ...rest
}) => {
  const styles = useMultiStyleConfig(`Chip`, {
    variant,
    colorScheme,
    size,
  });
  const btnRef = useRef(null);

  return (
    <Box __css={{ ...styles.outer }} {...rest}>
      <Text sx={{ ...styles.inner }}>{children}</Text>
      <Button
        ref={btnRef}
        sx={{ ...styles.button }}
        name={name}
        value={String(children)}
        onClick={onClick}
        pos={"relative"}
        zIndex={100}
      >
        <svg
          onClick={() => {
            btnRef.current.click();
          }}
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.89335 0.62148L4.51421 4L7.89335 7.37852C8.03554 7.52071 8.03554 7.75115 7.89335 7.89335C7.75117 8.03556 7.52072 8.03554 7.37852 7.89335L4 4.51421L0.62148 7.89335C0.479293 8.03554 0.248849 8.03554 0.106646 7.89335C-0.0355565 7.75117 -0.0355409 7.52072 0.106646 7.37852L3.48579 4L0.106646 0.62148C-0.0355409 0.479293 -0.0355409 0.248849 0.106646 0.106646C0.248833 -0.0355565 0.479277 -0.0355409 0.62148 0.106646L4 3.48579L7.37852 0.106646C7.52071 -0.0355409 7.75115 -0.0355409 7.89335 0.106646C8.03556 0.248833 8.03554 0.479277 7.89335 0.62148Z"
            fill="#F9FFF2"
          />
        </svg>
      </Button>
    </Box>
  );
};
