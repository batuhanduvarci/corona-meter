import React from "react";
import { StyleSheet, View, Text } from "react-native";
import numeral from "numeral";
import i18n from "i18n-js";

export default WorldMapScreen = ({ data }) => {
  const numberFormat = i18n.t("number_format");

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
      <View style={styles.innerContainer} />
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
  innerContainer: {
    height: 1,
    width: 90,
    marginVertical: 4,
    backgroundColor: "lightgrey"
  }
});
