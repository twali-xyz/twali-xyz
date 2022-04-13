import type { ComponentStyleConfig } from "@chakra-ui/theme";

// You can also use the more specific type for
// a multipart component: ComponentMultiStyleConfig
export const customSteps: ComponentStyleConfig = {
  // The parts of the component
  parts: [
    "connector",
    "description",
    "icon",
    "label",
    "labelContainer",
    "step",
    "stepContainer",
    "stepIconContainer",
    "steps",
  ],
  // The base styles for each part
  baseStyle: {
    steps: {
      display: "flex",
      fontFamily: "PP Telegraf",
      fontSize: "16px",
      lineHeight: "24px",
      width: "600px",
    },
    connector: {
      borderTopWidth: "0",
    },
    stepContainer: {
      color: "#98B2B2",
      display: "flex",
    },
    stepIconContainer: {
      display: "flex",
      alignSelf: "center",
      justifySelf: "center",
      width: "24px",
      height: "24px",
      border: "1px solid white",
      borderRadius: "50%",
      span: { fontSize: "12px" },
    },
    label: {
      paddingLeft: "7px",
      color: "#F9FFF2",
    },
    icon: {
      borderRadius: "50%",
      height: "24px",
      width: "24px",
      border: "1px solid white",
      backgroundColor: "transparent",
      color: "#F9FFF2",
      fontSize: "12px",
    },
  },
  // The size styles for each part
  sizes: {},
  // The variant styles for each part
  variants: {},
  // The default `size` or `variant` values
  defaultProps: {},
};

