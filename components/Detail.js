import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, THEME } from "../constant";
const back = require("../assets/icons/back.png");
const cart = require("../assets/icons/cart.png");

const Detail = ({ navigation, route }) => {
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    let { item } = route.params;
    setProduct(item);
  });

  function renderHeader() {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back} style={{ height: 35, width: 35 }} />
        </TouchableOpacity>

        <View style={styles.title}>
          <Text style={THEME.h1}>Hương Lúa</Text>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
          }}
        >
          <Image source={cart} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
      </View>
    );
  }

  function renderShowcase() {
    return (
      <View style={styles.showcase}>
        <Image source={product?.src} style={styles.image} />
        <View style={styles.count}>
          <Text style={styles.count_txt} onPress={() => setCount(count - 1)}>
            -
          </Text>
          <Text style={styles.count_txt}>{count}</Text>
          <Text style={styles.count_txt} onPress={() => setCount(count + 1)}>
            +
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderShowcase()}
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZES.paddingTop,
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.secondry2,
  },
  header: {
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    backgroundColor: COLORS.secondry,
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: SIZES.padding,
    minWidth: "50%",
    alignItems: "center",
  },
  showcase: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
  },
  image: {
    height: 230,
    width: 230,
    borderRadius: 180,
  },
  count: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: COLORS.white,
    borderRadius: 60,
    top: -40,
    width: 150,
    padding: SIZES.padding,
  },
  count_txt: {
    fontSize: SIZES.heading,
  },
});
