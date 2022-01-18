import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../Home";
import AddProduct from "../AddProduct";
import { Me } from "../Me";
import { Image } from "react-native";

import { COLORS, AAA } from "../../constant";
const cup = require("../../assets/icons/cup.png");
const data = require("../../assets/icons/data.png");
const me = require("../../assets/icons/me.png");

const Tab = createBottomTabNavigator();

export const tab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home0"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, tintColor }) => (
            <Image
              source={cup}
              style={{
                width: 50,
                height: 50,
                tintColor: focused ? COLORS.primary : COLORS.secondry,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Home1"
        component={AddProduct}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, tintColor }) => (
            <Image
              source={data}
              style={{
                width: 30,
                height: 33,
                tintColor: focused ? COLORS.primary : COLORS.secondry,
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Home2"
        component={Me}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, tintColor }) => (
            <Image
              source={me}
              style={{
                width: 35,
                height: 35,
                tintColor: focused ? COLORS.primary : COLORS.secondry,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
