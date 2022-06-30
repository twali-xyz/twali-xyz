import type { ComponentStyleConfig } from "@chakra-ui/theme";

// You can also use the more specific type for
// a multipart component: ComponentMultiStyleConfig
export const ModalStyle: ComponentStyleConfig ={
    // 1. We can update the base styles
    baseStyle: {
    },
    // 2. We can add a new button size or extend existing
    sizes: {
        selectionXL: {
            width: "850px",
            height: "420px",
            borderRadius: "16px",
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