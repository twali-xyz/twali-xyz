import { mode } from "@chakra-ui/theme-tools";
import {extendTheme, ThemeConfig } from "@chakra-ui/react";
import { customSteps } from "./components/stepsTheme";
import { ButtonStyle as Button } from "./components/buttonTheme";
import { ChipStyle as Chip } from "./components/chipTheme";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  cssVarPrefix: "twali",
};

export const twaliTheme = extendTheme({
  config,
  colors: {
    fresh: "#F9FFF2",
    zing: "#C7F83C",
    cave: "#062B2A",
    aqua: "#0DD5D1",
    inverse: "#0A1313",
    subtle: "#98B2B2",

    n1: "#F9FFF2",
    n2: "#98B2B2",
    n3: "#587070",
    n4: "#1F3535",
    n5: "#041E1D",
    n6: "#041A19",
    n7: "#0A1313",

    crest: "#3290D3",
    lilac: "#A096E8",
    grass: "#14C791",
    slime: "#58F27A",
    plum: "#9350B2",

    gradient1:
      "linear-gradient(136.3deg, #0DD5D1 -3.88%, #9350B3 84.78%)",
    gradient2:
      "linear-gradient(65.14deg, #35FF9E 10.35%, #A7AFF9 76.62%)",
    gradient3:
      "linear-gradient(141.13deg, #58F27A -4.2%, #3290D3 103.05%)",
    gradient4:
      "linear-gradient(136.48deg, #A096E8 28.13%, #3290D3 97.83%)",
    gradient5: 
      "linear-gradient(#0DD5D1 0%, #9350B3 100%)",

    error: "#FF6C63",
    warning: "#F2E358",
    success: "#14C791",
    info: "#A096E8",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("white", "rgb(30, 30, 30)")(props),
        color: mode("rgb(0, 0, 0)", "rgb(255, 255, 255)")(props),
      },
    }),
  },
  components: {
    Steps: customSteps,
    Button: Button,
    Chip: Chip
  },
});
