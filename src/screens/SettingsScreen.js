import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Animated,
  Picker
} from "react-native";
import Header from "../components/Header";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { AsyncStorage, Platform } from "react-native";
import i18n from "i18n-js";

const tabTitle = i18n.t("settings_label");

export default SettingsScreen = props => {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [language, setLanguage] = useState(i18n.locale);

  console.log("props", props);

  const clearLocalStorage = async () => {
    if (Platform.OS == "android") {
      await AsyncStorage.clear();
    } else if (Platform.OS == "ios") {
      await AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
    }
  };

  i18n.locale = language;

  return (
    <Animated.View style={{ flex: 1 }}>
      <Header tabTitle={tabTitle} scrollY={scrollY} />
      <ScrollView
        style={{ flex: 1 }}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } }
        ])}
      >
        <View style={styles.container}>
          <View style={styles.rowStyle}>
            <Text style={{ color: "dimgrey", fontSize: 12 }}>
              {i18n.t("local_storage_label")}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "column"
            }}
            onPress={() => {
              clearLocalStorage();
            }}
          >
            <View
              style={[
                styles.rowStyle,
                {
                  flexDirection: "row",
                  backgroundColor: "white",
                  borderTopWidth: 0.5,
                  borderBottomWidth: 0.5,
                  borderColor: "dimgrey",
                  justifyContent: "space-between"
                }
              ]}
            >
              <Text style={{ alignSelf: "center", fontSize: 14 }}>
                {i18n.t("wipe_storage_label")}
              </Text>
              <View style={{ alignSelf: "center" }}>
                <Ionicons name="ios-arrow-forward" size={24} color="black" />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.rowStyle}>
            <Text style={{ color: "dimgrey", fontSize: 12 }}>
              {i18n.t("language_label")}
            </Text>
          </View>
          {/* <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "column"
            }}
            onPress={() => {}}
          >
            <View
              style={[
                styles.rowStyle,
                {
                  flexDirection: "row",
                  backgroundColor: "white",
                  borderTopWidth: 0.5,
                  borderBottomWidth: 0.5,
                  borderColor: "dimgrey",
                  justifyContent: "space-between"
                }
              ]}
            >
              <Text style={{ alignSelf: "center", fontSize: 14 }}>
                {i18n.locale == "tr-US" ? "Türkçe" : "English"}
              </Text>
              <View style={{ alignSelf: "center" }}>
                <Ionicons name="ios-arrow-forward" size={24} color="black" />
              </View>
            </View>
          </TouchableOpacity> */}
          <View style={{ flex: 1 }}>
            <Picker
              selectedValue={language}
              style={{
                justifyContent: "center",
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                borderColor: "dimgrey"
              }}
              itemStyle={{
                fontSize: 14,
                height: 100,
                backgroundColor: "white"
              }}
              onValueChange={itemValue => {
                setLanguage(itemValue);
              }}
            >
              <Picker.Item label="Türkçe" value="tr-US" />
              <Picker.Item label="English" value="en-US" />
            </Picker>
          </View>
          <View style={styles.rowStyle}>
            <Text style={{ color: "dimgrey", fontSize: 12 }}>
              {i18n.t("about_label")}
            </Text>
          </View>
          <View
            style={[
              styles.rowStyle,
              {
                flexDirection: "row",
                backgroundColor: "white",
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                borderColor: "dimgrey",
                justifyContent: "space-between"
              }
            ]}
          >
            <Text style={{ alignSelf: "center", fontSize: 14 }}>
              {i18n.t("version_label")}
            </Text>
            <View style={{ alignSelf: "center" }}>
              <Text
                style={{ alignSelf: "center", fontSize: 14, color: "dimgrey" }}
              >
                1.0.0
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.rowStyle,
              {
                flexDirection: "row",
                backgroundColor: "white",
                borderBottomWidth: 0.5,
                borderColor: "dimgrey",
                justifyContent: "space-between"
              }
            ]}
          >
            <Text style={{ alignSelf: "center", fontSize: 14 }}>
              {i18n.t("contact_label")}
            </Text>
            <View style={{ alignSelf: "center" }}>
              <Text
                style={{ alignSelf: "center", fontSize: 14, color: "dimgrey" }}
              >
                batuhanduvarci@gmail.com
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "column"
            }}
          >
            <View
              style={[
                styles.rowStyle,
                {
                  flexDirection: "row",
                  backgroundColor: "white",
                  borderBottomWidth: 0.5,
                  borderColor: "dimgrey",
                  justifyContent: "space-between"
                }
              ]}
            >
              <Text style={{ alignSelf: "center", fontSize: 14 }}>
                {i18n.t("acknowledgement_label")}
              </Text>
              <View style={{ alignSelf: "center" }}>
                <Ionicons name="ios-arrow-forward" size={18} color="black" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 100
  },
  rowStyle: {
    paddingVertical: 10,
    paddingHorizontal: 8
  }
});
