import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Animated,
  Button,
} from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES, THEME } from "../constant";
const back = require("../assets/icons/back.png");
const list = require("../assets/icons/list.png");

const Detail = ({ navigation, route }) => {
  const scrollX = new Animated.Value(0);

  let { cart, ID } = route.params;
  let total = 0;
  cart.forEach((element) => {
    total += element.price * element.qty;
  });
  const [price, setPrice] = useState(total);

  function editOrder(action, id) {
    if (action == "+") {
      cart[id].qty += 1;
    } else {
      if (cart[id].qty > 0) {
        cart[id].qty -= 1;
      }
    }

    let price = 0;
    cart.forEach((element) => {
      price += element.price * element.qty;
    });
    setPrice(price);
  }

  function countItem() {
    let count = 0;
    cart.forEach((element) => {
      count += element.qty;
    });
    return count;
  }

  function renderHeader() {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={back} style={{ height: 35, width: 35 }} />
        </TouchableOpacity>

        <View style={styles.title}>
          <Text style={THEME.h5}>Hương Lúa</Text>
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

  class renderCart {
    constructor() {}

    render() {
      return (
        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={(scrooler) => {
            this.scrooler = scrooler;
          }}
          onContentSizeChange={() =>
            this.scrooler.scrollTo({
              x: SIZES.width * ID,
              y: 0,
              animated: false,
            })
          }
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        >
          {cart.map((product, index) => {
            return (
              <View key={index} style={styles.showcase}>
                <Image source={product?.src} style={styles.image} />

                <View style={styles.count}>
                  <Text style={THEME.h4} onPress={() => editOrder("-", index)}>
                    -
                  </Text>
                  <Text style={THEME.h4}>{cart[index].qty}</Text>
                  <Text style={THEME.h4} onPress={() => editOrder("+", index)}>
                    +
                  </Text>
                </View>

                <Text style={THEME.h1}>{product?.name}</Text>
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
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={{ height: 30 }}>
        <View style={styles.dots}>
          {cart?.map((item, index) => {
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

  function renderOrder() {
    return (
      <View style={styles.order}>
        <View style={styles.order_price}>
          {countItem() > 1 ? (
            <Text style={THEME.h3}>{countItem() + " items in Cart"}</Text>
          ) : (
            <Text style={THEME.h3}>{countItem() + " item in Cart"}</Text>
          )}
          <Text style={THEME.h3}>{price + " đ"}</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.order_btn}>
            <Text style={styles.order_txt}>Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {cart.length > 0 && new renderCart().render()}
      {cart.length > 0 && renderDots()}
      {renderOrder()}
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZES.paddingTop,
    backgroundColor: COLORS.secondry2,
    height: "100%",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: SIZES.padding,
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
    top: 70,
    display: "flex",
    flex: 1,
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
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    height: SIZES.padding,
    marginBottom: 100,
  },
  order: {
    bottom: 0,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    width: "100%",
    paddingBottom: 40,
    paddingHorizontal: SIZES.padding,
  },
  order_price: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: SIZES.padding2,
  },
  order_btn: {
    backgroundColor: COLORS.primary,
    borderRadius: 7,
  },
  order_txt: {
    style: THEME.h5,
    textAlign: "center",
    padding: SIZES.padding,
    tintColor: COLORS.white,
  },
});
