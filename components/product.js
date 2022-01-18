import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SIZES } from "../constant";

const Product = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={props.img} />
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.price}>{props.price}</Text>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: SIZES.padding,
  },
  img: {
    height: 200,
    width: "100%",
    borderRadius: 30,
  },
  name: {
    fontSize: SIZES.heading,
    fontWeight: SIZES.headingWeight,
    marginTop: SIZES.padding,
  },
  price: {
    fontSize: SIZES.body,
  },
});
