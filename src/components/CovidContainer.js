import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import {
  FontAwesome,
  Octicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import i18n from "i18n-js";

export default CovidContainer = ({ data }) => {
  const iconSelector = status => {
    if (status === "increased") {
      return <FontAwesome name="arrow-up" size={12} color="red" />;
    } else if (status === "decreased") {
      return <FontAwesome name="arrow-down" size={12} color="limegreen" />;
    } else {
      return <Octicons name="dash" size={12} color="lightgray" />;
    }
  };
  const renderRow = () => {
    const rows = [];
    for (let key in data) {
      let label = i18n.t(key);

      rows.push(
        <View key={Math.random()} style={styles.innerContainer}>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="human-male"
              size={24}
              color={data[key].fieldColor}
            />
            <Text
              style={[
                styles.valueTextStyle,
                {
                  color: data[key].fieldColor
                }
              ]}
            >
              {data[key].value}
            </Text>
            <View style={styles.labelContainerStyle}>
              <Text style={styles.labelTextStyle}>{label}</Text>
              {iconSelector(data[key].status)}
            </View>
          </View>
        </View>
      );
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      {data == undefined ? (
        <ActivityIndicator
          style={{ marginVertical: 20 }}
          size="small"
          color="#007AFF"
        />
      ) : (
        renderRow()
      )}
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
  valueTextStyle: {
    fontSize: 14,
    marginTop: 4
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 2
  },
  labelContainerStyle: {
    alignItems: "center",
    marginTop: 4,
    flexDirection: "row"
  },
  labelTextStyle: { fontSize: 12, marginRight: 4, color: "dimgrey" }
});
