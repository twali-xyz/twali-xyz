import type { ComponentStyleConfig } from "@chakra-ui/theme";

// You can also use the more specific type for
// a multipart component: ComponentMultiStyleConfig
export const SliderStyle: ComponentStyleConfig = {
  // The parts of the component
  parts: [
    "Box",
    "Slider",
    "SliderMark",
    "SliderTrack",
    "SliderThumb",
    "SliderFilledTrack"
  ],
  // The base styles for each part
  baseStyle: {
    Slider: {
    },
    SliderMark: {
        marginY:"16px"
    },
    SliderFilledTrack: {
        bg:"zing",
        borderRadius:"full"
    },
    
  },
  // The size styles for each part
  sizes: {},
  // The variant styles for each part
  variants: {
    binary: {
        Slider: {
            width:"48px",
        },
        SliderTrack: {
        bg:"n2",
        height:"24px",
        width:"24px",
        borderRadius:"full",
        },
        SliderMark: {
            ml:"-2.5",
            fontSize:"sm",
        },
        SliderThumb: {
            boxSize:"20px",  
        }
    },
    smooth: {
       SliderThumb: { pos: "relative",},
       SliderMark: {
        ml:"-3.5%",
       }
      
    },
    snap: {
       SliderThumb: { pos: "relative",},
       SliderMark: {
        ml:"-3.5%",
       }
     
    },

},
  // The default `size` or `variant` values
  defaultProps: {},

}

