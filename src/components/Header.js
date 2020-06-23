import React, { useState } from "react";
import { StyleSheet, Animated, SafeAreaView } from "react-native";
import { Platform } from "@unimodules/core";

const HEADER_MAX_HEIGHT = 130;
const HEADER_MIN_HEIGHT = 70;

const TITLE_MAX_SIZE = 60;
const TITLE_MIN_SIZE = 20;

const Header = ({ tabTitle, scrollY }) => {
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp"
  });
  const titleHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [TITLE_MAX_SIZE, TITLE_MIN_SIZE],
    extrapolate: "clamp"
  });
  const headerZindex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [0, 1],
    extrapolate: "clamp"
  });
  const titleContainerColor = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: ["#F2F2F2", "#007AFF"],
    extrapolate: "clamp"
  });
  const titleColor = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: ["black", "white"],
    extrapolate: "clamp"
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: titleContainerColor,
          height: headerHeight,
          zIndex: headerZindex
        }
      ]}
    >
      <SafeAreaView style={styles.innerContainer}>
        <Animated.Text
          style={{
            fontSize: titleHeight,
            color: titleColor,
            paddingTop: Platform.OS === "android" ? 16 : 0
          }}
        >
          {tabTitle}
        </Animated.Text>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    top: 0,
    left: 0,
    right: 0
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row"
  }
});

export default Header;
