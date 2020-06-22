import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import i18n from "i18n-js";

const screenWidth = Dimensions.get("screen").width;

export default WatchListContainer = ({ data, action }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flex: 1, fontWeight: "bold", fontSize: 16 }}>
              {data.country}
            </Text>
            <TouchableOpacity
              onPress={() => {
                action(data.country);
              }}
            >
              <View
                style={{
                  borderRadius: 6,
                  backgroundColor: "#007AFF",
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  alignSelf: "center"
                }}
              >
                <Text style={{ color: "white" }}>
                  {i18n.t("details_label")}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "dimgray",
              paddingHorizontal: 16,
              marginVertical: 4
            }}
          />
          <View
            style={{
              flexDirection: "row",
              marginTop: 4
            }}
          >
            <View
              style={{
                width: 100,
                height: 60
              }}
            >
              <Image
                style={{ width: 100, height: 60, borderRadius: 8 }}
                source={{ uri: data.flagUri }}
              />
            </View>
            <View style={{ flex: 1, flexDirection: "column" }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginStart: 16
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-start"
                  }}
                >
                  <Text style={styles.labelStyle}>{i18n.t("confirmed")}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center"
                  }}
                >
                  <Text style={{ color: "#FA8748", marginLeft: 32 }}>
                    {data.confirmed}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginStart: 16
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-start"
                  }}
                >
                  <Text style={styles.labelStyle}>{i18n.t("recovered")}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center"
                  }}
                >
                  <Text style={{ color: "#40C12C", marginLeft: 32 }}>
                    {data.recovered}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginStart: 16
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-start"
                  }}
                >
                  <Text style={styles.labelStyle}>{i18n.t("deaths")}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center"
                  }}
                >
                  <Text style={{ color: "#F84849", marginLeft: 32 }}>
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
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    marginVertical: 2
  },
  shimmerStyle: { borderRadius: 8 }
});
