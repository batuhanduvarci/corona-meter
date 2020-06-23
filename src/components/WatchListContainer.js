import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import i18n from "i18n-js";

export default WatchListContainer = ({ data, action }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.countryTextStyle}>{data.country}</Text>
            <TouchableOpacity
              onPress={() => {
                action(data.country);
              }}
            >
              <View style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>
                  {i18n.t("details_label")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.dividerStyle} />
          <View style={styles.bottomContainerStyle}>
            <View style={styles.imageContainerStyle}>
              <Image style={styles.imageStyle} source={{ uri: data.flagUri }} />
            </View>
            <View style={{ flex: 1, flexDirection: "column" }}>
              <View style={styles.rowStyle}>
                <View style={styles.labelContainerStyle}>
                  <Text style={styles.labelStyle}>{i18n.t("confirmed")}</Text>
                </View>
                <View style={styles.valueContainerStyle}>
                  <Text style={styles.valueStyle}>{data.confirmed}</Text>
                </View>
              </View>
              <View style={styles.rowStyle}>
                <View style={styles.labelContainerStyle}>
                  <Text style={styles.labelStyle}>{i18n.t("recovered")}</Text>
                </View>
                <View style={styles.valueContainerStyle}>
                  <Text style={[styles.valueStyle, { color: "#40C12C" }]}>
                    {data.recovered}
                  </Text>
                </View>
              </View>
              <View style={styles.rowStyle}>
                <View style={styles.labelContainerStyle}>
                  <Text style={styles.labelStyle}>{i18n.t("deaths")}</Text>
                </View>
                <View style={styles.valueContainerStyle}>
                  <Text style={[styles.valueStyle, { color: "#F84849" }]}>
                    {data.deaths}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
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
    justifyContent: "center"
  },
  labelStyle: {
    color: "dimgrey"
  },
  countryTextStyle: { flex: 1, fontWeight: "bold", fontSize: 16 },
  buttonStyle: {
    borderRadius: 6,
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: "center"
  },
  buttonTextStyle: { color: "white" },
  dividerStyle: {
    height: 1,
    backgroundColor: "dimgray",
    paddingHorizontal: 16,
    marginVertical: 4
  },
  bottomContainerStyle: {
    flexDirection: "row",
    marginTop: 4
  },
  imageContainerStyle: {
    width: 100,
    height: 60
  },
  imageStyle: { width: 100, height: 60, borderRadius: 8 },
  rowStyle: {
    flex: 1,
    flexDirection: "row",
    marginStart: 16
  },
  labelContainerStyle: {
    flex: 1,
    alignItems: "flex-start"
  },
  valueContainerStyle: {
    flex: 1,
    alignItems: "center"
  },
  valueStyle: { color: "#FA8748", marginLeft: 32 }
});
