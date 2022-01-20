import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../Home";
import { Me } from "../Me";
import { Image } from "react-native";

import { COLORS, AAA } from "../../constant";
const home = require("../../assets/icons/home.png");
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
        name="Home1"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, tintColor }) => (
            <Image
              source={home}
              style={{
                width: 40,
                height: 40,
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
