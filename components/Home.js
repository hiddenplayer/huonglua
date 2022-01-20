import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLORS, SIZES, THEME } from "../constant";
import { list_types, list_products } from "../database";
const logo = require("../assets/logo.png");
const cart = require("../assets/icons/cart.png");

export const Home = ({ navigation }) => {
  const [types, setTypes] = useState(list_types);
  const [selectedType, setSelectedType] = useState(1);
  const [products, setProducts] = useState(list_products);

  function onSelect(type) {
    let showcases = list_products.filter((a) => a.type === type);
    setProducts(showcases);
    setSelectedType(type);
    renderTypes();
  }
  const handleCart = () => {};

  function renderHeader() {
    return (
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={logo} style={{ height: 70, width: 70 }} />
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

  function renderTypes() {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.types}
      >
        {list_types.map((type, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={
                selectedType == type.id ? styles.type_selected : styles.type
              }
              onPress={() => onSelect(type.id)}
            >
              <Text
                style={
                  selectedType == type.id
                    ? styles.type_txt_selected
                    : styles.type_txt
                }
              >
                {type.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }

  function renderProducts() {
    return (
      <ScrollView style={styles.products}>
        {products.map((product, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("Detail", { item: product })}
              style={styles.product}
            >
              <Image style={styles.product_img} source={product.src} />
              <Text style={styles.product_name}>{product.name}</Text>
              <Text style={styles.product_price}>{product.price}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderTypes()}
      {renderProducts()}
    </View>
  );
};

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
  types: {
    display: "flex",
    flexDirection: "row",
    marginTop: SIZES.padding2,
  },
  type: {
    padding: SIZES.padding,
    marginHorizontal: SIZES.padding,
    borderColor: COLORS.secondry,
    backgroundColor: COLORS.secondry2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 25,
  },
  type_selected: {
    padding: SIZES.padding,
    marginHorizontal: SIZES.padding,
    borderColor: COLORS.secondry,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 25,
  },
  type_txt: {
    lineHeight: 28,
    fontWeight: "400",
    textAlign: "center",
  },
  type_txt_selected: {
    color: COLORS.white,
    lineHeight: 28,
    fontWeight: "400",
    textAlign: "center",
  },
  products: {
    marginBottom: 120,
  },
  product: {
    marginTop: 20,
    marginHorizontal: SIZES.padding,
  },
  product_img: {
    height: 200,
    width: "100%",
    borderRadius: 30,
  },
  product_name: {
    fontSize: SIZES.heading,
    fontWeight: SIZES.headingWeight,
    marginTop: SIZES.padding,
  },
  product_price: {
    fontSize: SIZES.body,
  },
});
