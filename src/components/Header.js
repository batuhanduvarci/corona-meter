import React, { useState } from "react";
import { StyleSheet, Animated, SafeAreaView } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import SearchBar from "./SearchBar";

const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 50;

const TITLE_MAX_SIZE = 60;
const TITLE_MIN_SIZE = 16;

const Header = ({ tabTitle, scrollY, isSearchActive, getCountries }) => {
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

  const toggleVisibility = () => {
    if (isSearchBarVisible) {
      setSearchBarVisible(false);
    }
  };

  return (
    <Animated.View
      style={{
        position: "absolute",
        flexDirection: "row",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: titleContainerColor,
        height: headerHeight,
        zIndex: headerZindex,
        borderBottomEndRadius: -16
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "row"
        }}
      >
        {/* {isSearchBarVisible ? (
          <SearchBar
            headerHeight={headerHeight}
            toggleVisibility={toggleVisibility}
            getCountries={getCountries}
          />
        ) : (
          <Animated.Text
            style={{
              fontSize: titleHeight,
              marginStart: 5,
              color: titleColor,
              alignSelf: "center"
            }}
          >
            {tabTitle}
          </Animated.Text>
        )} */}
        <Animated.Text
          style={{
            fontSize: titleHeight,
            marginStart: 5,
            color: titleColor,
            alignSelf: "center"
          }}
        >
          {tabTitle}
        </Animated.Text>
      </SafeAreaView>
      <SafeAreaView
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 0,
          right: 4,
          bottom: 4
        }}
      >
        {/* {isSearchActive ? (
          <Animated.View style={{}}>
            {isSearchBarVisible ? null : (
              <TouchableOpacity
                onPress={() => {
                  setSearchBarVisible(true);
                }}
              >
                <FontAwesome name="search" size={24} color="#F2F2F2" />
              </TouchableOpacity>
            )}
          </Animated.View>
        ) : null} */}
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({});

export default Header;
