import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TextTicker from "react-native-text-ticker";
import i18n from "i18n-js";

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
        {/* <Text>
          {countryName}
        </Text> */}
        {/* <Text style={styles.titleText}>{countryName}</Text> */}
        {/* <FontAwesome name="arrow-right" size={30} color="dimgrey" /> */}
        <View style={{ flex: 1, paddingLeft: 10 }}>
          {watchState ? (
            <TouchableOpacity
              onPress={() => {
                removeFromWatchListAction(countryName);
              }}
            >
              <View
                style={{
                  borderRadius: 6,
                  backgroundColor: "#F84849",
                  paddingHorizontal: 12,
                  alignSelf: "center"
                }}
              >
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
                style={{
                  borderRadius: 6,
                  backgroundColor: "lightgrey",
                  paddingHorizontal: 12,
                  alignSelf: "center"
                }}
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
            <View
              style={{
                borderRadius: 6,
                backgroundColor: "#007AFF",
                paddingHorizontal: 12,
                paddingVertical: 4,
                alignSelf: "center"
              }}
            >
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
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2
  },
  shimmerStyle: { borderRadius: 8 }
});
