import type { ComponentStyleConfig } from "@chakra-ui/theme";

// You can also use the more specific type for
// a multipart component: ComponentMultiStyleConfig
export const SelectStyle: ComponentStyleConfig ={
    // 1. We can update the base styles
    baseStyle: {
        height:"40px",
        maxW:"320px",
        width:"100%",
        borderRadius:"4px",
        fontFamily:"PP Telegraf Light",
        borderColor:"n3",
        _hover:{borderColor: "fresh", cursor: "pointer"},
        _active: {borderColor: "zing"},
        fontSize:"16px",
        fontWeight:"300",
        lineHeight:"24px",
        letterSpacing:"0.02em",
        textAlign:"left",
        color:"fresh",

    },
    // 2. We can add a new button size or extend existing
    sizes: {
        sm: {
            width: "130px",
        },
        md: {
            width: "297px",
        },
        lg: {
            width: "320px",
        }
    },
    // 3. We can add a new visual variant
    variants: {
      // 4. We can override existing variants
      // solid: (props) => ({
      //   bg: props.colorMode === "dark" ? "red.300" : "red.500",
      // }),
    },
  };