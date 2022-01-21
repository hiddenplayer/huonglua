import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES, THEME } from "../constant";
import { list_products } from "../database";
const back = require("../assets/icons/back.png");
const list = require("../assets/icons/list.png");

const Detail = ({ navigation, route }) => {
  const scrollX = new Animated.Value(0);
  const [count, setCount] = useState(1);
  const [cart, setCart] = useState(list_products);

  let { item } = route.params;
  // list = [...cart, item];
  // setCart(list);

  // useEffect(() => {
  //   let { item } = route.params;
  //   let list = [item, item];
  //   setCart(list);
  // });

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
          <Image source={list} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>
    );
  }

  function renderCart() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        // scrollEventThrottle={16}
        // snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {list_products.map((product, index) => {
          return (
            <View key={index} style={styles.showcase}>
              <Image source={product?.src} style={styles.image} />

              <View style={styles.count}>
                <Text
                  style={styles.count_txt}
                  onPress={() => setCount(count - 1)}
                >
                  -
                </Text>
                <Text style={styles.count_txt}>{count}</Text>
                <Text
                  style={styles.count_txt}
                  onPress={() => setCount(count + 1)}
                >
                  +
                </Text>
              </View>

              <Text style={styles.name}>{product?.name}</Text>
              <Text style={styles.price}>
                {product?.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " đ"}
              </Text>
            </View>
          );
        })}
      </Animated.ScrollView>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={{ height: 30 }}>
        <View style={styles.dots}>
          {list_products?.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [8 * 0.8, 10, 8 * 0.8],
              extrapolate: "clamp",
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.secondry, COLORS.primary, COLORS.secondry],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderCart()}
      {renderDots()}
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
    marginLeft: 10,
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
    width: SIZES.width - SIZES.padding * 2,
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
  name: {
    fontSize: 32,
    fontWeight: "500",
  },
  price: {
    fontSize: 18,
  },
  dots: {
    marginTop: SIZES.padding2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: SIZES.padding,
  },
});
