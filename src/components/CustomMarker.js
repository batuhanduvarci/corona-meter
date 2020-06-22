import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Animated,
  Text,
  Modal,
  SafeAreaView
} from "react-native";
import numeral from "numeral";
import { TouchableOpacity } from "react-native-gesture-handler";
import i18n from "i18n-js";

const numberFormat = "0,0";

export default WorldMapScreen = ({ data }) => {
  const colorSelector = value => {
    var fraction = Math.round(value / 5000);
    var rgbValue;
    if (fraction > 255) {
      rgbValue = "rgb(255,0,0)";
    } else {
      rgbValue = `rgb(255, ${255 - fraction}, 0)`;
    }
    return rgbValue;
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colorSelector(data.cases)
        }
      ]}
    >
      <Text style={{ textAlign: "center" }}>{data.country}</Text>
      <View
        style={{
          postion: "absolute",
          height: 1,
          width: 90,
          marginVertical: 4,
          backgroundColor: "lightgrey"
        }}
      ></View>
      <Text>{i18n.t("total_case")}</Text>
      <Text>{numeral(data.cases).format(numberFormat)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 8,
    borderWidth: 1,
    borderColor: "black"
  },
  modalStyle: {
    flex: 1
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject
  }
});
