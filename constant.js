import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#F39C12",
  secondry: "#D5D8DC",
  secondry2: "#EAECEE",

  black: "#17202A",
  white: "#F7F9F9",
};

export const SIZES = {
  width,
  height,
  paddingTop: 40,
  padding: 10,
  padding2: 15,
};

export const THEME = {
  h1: {
    fontSize: 32,
    fontWeight: "500",
  },
  h3: {
    fontSize: 22,
    fontWeight: "500",
  },
  h4: {
    fontSize: 24,
    fontWeight: "300",
  },
  h5: {
    fontSize: 20,
    fontWeight: "300",
  },
  txt: {
    fontSize: 18,
  },
};
