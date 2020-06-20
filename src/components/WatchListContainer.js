import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  Image
} from "react-native";

const screenWidth = Dimensions.get("screen").width;

export default WatchListContainer = ({ data }) => {
  return (
    <View style={{ flex : 1 }}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={{ flex: 1, fontWeight: "bold", fontSize: 16 }}>
            {data.country}
          </Text>
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
                  <Text style={styles.labelStyle}>Confirmed</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-start"
                  }}
                >
                  <Text style={{ color: "#FA8748" }}>{data.confirmed}</Text>
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
                  <Text style={styles.labelStyle}>Recovered</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-start"
                  }}
                >
                  <Text style={{ color: "#40C12C" }}>{data.recovered}</Text>
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
                  <Text style={styles.labelStyle}>Deaths</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-start"
                  }}
                >
                  <Text style={{ color: "#F84849" }}>{data.deaths}</Text>
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
