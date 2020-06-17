import React, { useEffect } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MainScreen from "./src/screens/MainScreen";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome, Entypo, Ionicons } from "@expo/vector-icons";
import CountryListScreen from "./src/screens/CountryListScreen";
import WorldMapScreen from "./src/screens/WorldMapScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import TranslationTurkish from "./src/localization/TranslationTurkish";
import TranslationEnglish from "./src/localization/TranslationEnglish";

i18n.translations = {
  "en-US": TranslationEnglish,
  "tr-US": TranslationTurkish
};
i18n.defaultLocale = "en-US";
i18n.fallbacks = true;

if (Localization.locale == "tr-US") {
  i18n.locale = Localization.locale;
} else {
  i18n.locale = "en-US";
}

console.log(i18n.locale);

export default function App() {
  const Tab = createMaterialBottomTabNavigator();

  const changeLanguage = value => {
    i18n.locale = value;
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={i18n.t("bottom_navigator_home")}
        activeColor="white"
      >
        <Tab.Screen
          name={i18n.t("bottom_navigator_home")}
          component={MainScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Entypo name="home" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen
          name={i18n.t("bottom_navigator_map")}
          component={WorldMapScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="map" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen
          name={i18n.t("bottom_navigator_countries")}
          component={CountryListScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="globe" size={24} color={color} />
            )
          }}
        />
        <Tab.Screen
          name={i18n.t("bottom_navigator_settings")}
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="md-settings" size={24} color={color} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
