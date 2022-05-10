import type { ComponentStyleConfig } from "@chakra-ui/theme";

// You can also use the more specific type for
// a multipart component: ComponentMultiStyleConfig
export const ChipStyle: ComponentStyleConfig = {
  // The parts of the component
  parts: [
    "outer",
    "inner",
    "button"
  ],
  // The base styles for each part
  baseStyle: {
    outer: {
      borderRadius:"32px", 
      background:"gradient5", 
      display: "flex",
      alignItems: "center",
      p:"1px",
      height: "34px",
      width:"fit-content"

    },
    inner: {
        fontSize:"14px",
        lineHeight:"22px",
        fontFamily:"PP Telegraf",
        alignSelf:"start",
        backgroundColor:"n6",
        p:"4px 12px",
        borderRadius:"32px",
        whiteSpace:"nowrap",
    },
    button: {
      display:"none",
    }
  },
  // The size styles for each part
  sizes: {},
  // The variant styles for each part
  variants: {
    "gradient": {
      outer: {
        background:"gradient1"
      },
      inner: {
        background:"unset"
      }
    },
    "bounty": {
      outer: {
        background: "transparent",
        height: "28px",
        padding: "0px !important",
        border: "1px solid #14C791BF",
        borderRadius: "4px"
      },
      inner: {
        background: "#58F27A1A",
        borderRadius: "4px",
        height: "inherit",
        alignSelf: "center",
        fontSize: "12px",
        justifyContent: "center"
      }
    },
    "status": {
      outer: {
        background:"transparent",
        padding: "0px !important",
        height: "28px",
        border:"1px solid #3290D3",
        borderRadius: "4px"
      },
      inner: {
        background: "#3290D31A",
        borderRadius: "4px",
        height: "inherit",
        alignSelf: "center",
        fontSize: "12px",
        justifyContent: "center"

      }
    },
    "created": {
      outer: {
        background: "transparent",
        height: "28px",
        padding: "0px !important",
        border: "1px solid #98B2B2",
        borderRadius: "4px"
      },
      inner: {
        background: "#98B2B226",
        borderRadius: "4px",
        height: "inherit",
        alignSelf: "center",
        fontSize: "12px",
        justifyContent: "center"

      }
    },
    "type": {
      outer: {
        background: "transparent",
        height: "28px",
        padding: "0px !important",
        border: "1px solid #A096E8",
        borderRadius: "4px"
      },
      inner: {
        background: "#A096E81A",
        borderRadius: "4px",
        height: "inherit",
        alignSelf: "center",
        fontSize: "12px",
        justifyContent: "center"
      }
    },
    "button": {
      outer: {
        background:"gradient1",
      },
      inner: {
        background:"unset",
        paddingRight: "4px"
      },
      button: {
        display: "flex",
        minWidth:"none",
        width: "16px !important",
        height: "16px",
        marginRight: "8px",
        marginLeft:"0",
        padding: "0",
        background: "rgba(10, 19, 19, 0.2)",
        borderRadius: "50%"
      }
    },
  },
  // The default `size` or `variant` values
  defaultProps: {},
};

