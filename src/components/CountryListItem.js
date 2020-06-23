import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TextTicker from "react-native-text-ticker";
import i18n from "i18n-js";
import { Platform } from "@unimodules/core";

export default CountryListItem = ({
  countryName,
  action,
  addToWatchListAction,
  removeFromWatchListAction,
  watchState
}) => {
  const renderCell = () => {
    return (
      <View style={styles.container}>
        <View style={{ flex: 4 }}>
          {countryName.length > 25 ? (
            <TextTicker
              style={styles.titleText}
              duration={5000}
              loop
              marqueeDelay={1000}
              shouldAnimateTreshold={10}
              bounce={false}
            >
              {countryName}
            </TextTicker>
          ) : (
            <Text style={styles.titleText}>{countryName}</Text>
          )}
        </View>
        <View style={{ flex: 1, paddingLeft: 10 }}>
          {watchState ? (
            <TouchableOpacity
              onPress={() => {
                removeFromWatchListAction(countryName);
              }}
            >
              <View style={styles.iconStyle}>
                <MaterialCommunityIcons
                  name="eye-check-outline"
                  size={20}
                  color="white"
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                addToWatchListAction(countryName);
              }}
            >
              <View
                style={[styles.iconStyle, { backgroundColor: "lightgrey" }]}
              >
                <MaterialCommunityIcons
                  name="eye-plus-outline"
                  size={20}
                  color="dimgrey"
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            action(countryName);
          }}
        >
          <View style={{ paddingLeft: 4 }}>
            <View style={styles.buttonTextStyle}>
              <Text style={{ color: "white" }}>{i18n.t("details_label")}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return renderCell();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
    margin: 4,
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center"
  },
  titleText: {
    fontSize: 18
  },
  iconStyle: {
    borderRadius: 6,
    backgroundColor: "#F84849",
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "android" ? 2 : 0,
    alignSelf: "center"
  },
  buttonTextStyle: {
    borderRadius: 6,
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: "center"
  }
});
