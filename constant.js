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

  title: 26,
  titleWeight: "500",
  heading: 22,
  headingWeight: "500",
  body: 14,
};

export const THEME = {
  h1: {
    fontSize: SIZES.title,
    fontWeight: SIZES.titleWeight,
  },
};
