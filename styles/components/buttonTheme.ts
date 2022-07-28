import type { ComponentStyleConfig } from "@chakra-ui/theme";

// You can also use the more specific type for
// a multipart component: ComponentMultiStyleConfig
export const ButtonStyle: ComponentStyleConfig ={
    // 1. We can update the base styles
    baseStyle: {
        fontFamily: "PP Telegraf Bold",
        fontWeight: "700",
        fontSize: "0.875rem",
        lineHeight: "0.688rem",
        letterSpacing:"0.06em",
        textTransform: "uppercase",
        borderRadius:"32px",
    },
    // 2. We can add a new button size or extend existing
    sizes: {
        sm: {
            width: "130px",
        },
        md: {
            width: "160px",
        },
        lg: {
            width: "220px",
        }
    },
    // 3. We can add a new visual variant
    variants: {
      primary: {
            backgroundColor: "zing",
            color:"cave",
            fontSize: "0.875rem",
            height: "40px",
            _hover: {
                border: "1px solid rgba(199, 248, 60, 1)", 
                background: "rgba(199, 248, 60, 0.4)",
                color: "zing"
                    },
            _active: {
                background: "rgba(199, 248, 60, 0.2)",
                color: "rgba(199, 248, 60, 0.8)"
            },
            _disabled: {
                background: "rgba(88, 112, 112, 0.75)",
                color: "subtle",
                cursor: "not-allowed"

            },
            
      },
      secondary: {
        backgroundColor: "inverse",
        border: "1px solid rgba(152, 178, 178, 1)",
        color:"fresh",
        fontSize: "0.875rem",
        height: "40px",
        _hover: {
            border: "1px solid rgba(152, 178, 178, 1)",
            background: "rgba(152, 178, 178, 0.3)",
            color: "subtle"
                },
        _active: {
            background: "rgba(152, 178, 178, 0.2)",
            color: "rgba(152, 178, 178, 0.8)"
        },
        _disabled: {
            background: "rgba(88, 112, 112, 0.75)",
            color: "subtle",
            cursor: "not-allowed"
        },
    },
    dropdown: {
        bg:"n6",
        borderRadius:"none",
        height:"48px",
        border:"1px solid #587070",
        fontFamily:"PP Telegraf Light",
        fontSize:"16px !important",
        textTransform:"capitalize",
        fontWeight:"300",
        color:"subtle",
        _hover: {
            borderColor: "zing"
        }
        
  },
    //   4. We can override existing variants
    //   solid: (props) => ({
    //     bg: props.colorMode === "dark" ? "red.300" : "red.500",
    //   }),
    },
  };