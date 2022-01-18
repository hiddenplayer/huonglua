import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import firebase from "../firebase";
import { getDatabase, ref, onValue, set } from "firebase/database";
import Product from "./product";

import { COLORS, SIZES } from "../constant";
const logo = require("../assets/logo.png");
const cart = require("../assets/icons/cart.png");
const bottle = require("../assets/icons/bottle.png");
const can = require("../assets/icons/can.png");
const big = require("../assets/images/big.jpg");
const small = require("../assets/images/small.jpg");
const hundred = require("../assets/images/hundred.jpg");

const products = [
  { img: big, name: "Big size bottle", price: "13k" },
  { img: small, name: "Small size bottle", price: "8k" },
  { img: hundred, name: "Hundred days bottle", price: "60k" },
];
export const Home = () => {
  const handleCart = () => {
    const db = getDatabase();
    const reference = ref(db, "wine/");
    set(reference, {
      name: "Hundred days",
      price: "60k",
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={logo} style={{ height: 70, width: 70 }} />
        </TouchableOpacity>

        <Text style={styles.h1}>Main Categories</Text>

        <TouchableOpacity
          onPress={() => handleCart()}
          style={{
            width: 50,
          }}
        >
          <Image source={cart} style={{ width: 35, height: 30 }} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.list}>
        {products.map((pro, index) => {
          return (
            <Product
              key={index}
              img={pro.img}
              name={pro.name}
              price={pro.price}
            />
          );
        })}
        {/* <Product img={big} name={"Big style bottle"} price={"13k"} />
        <Product img={big} name={"Small style bottle"} price={"8k"} />
        <Product img={big} name={"Hundred days"} price={"60k"} /> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZES.paddingTop,
    paddingHorizontal: SIZES.padding,
  },
  header: {
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
  },
  h1: {
    fontSize: SIZES.title,
    fontWeight: SIZES.titleWeight,
  },
  list: {
    marginBottom: 60,
  },
});
