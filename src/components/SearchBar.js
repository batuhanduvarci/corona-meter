import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  SafeAreaView,
  TextInput
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";

const SearchBar = ({ toggleVisibility, getCountries }) => {
  return (
    <View
      style={{
        flex: 1,
        alignSelf: "center",
        marginHorizontal: 10,
        flexDirection: "row",
        borderRadius: 4,
        backgroundColor: "white"
      }}
    >
      <TextInput
        autoFocus={true}
        onChangeText={text => {
          getCountries(text);
        }}
        autoCorrect={false}
        style={{
          flex: 1,
          height: 30,
          paddingHorizontal: 10
        }}
      />
      <View
        style={{
          width: 30,
          height: 30,
          top: 0,
          right: 0,
          alignSelf: "center",
          justifyContent: "center"
        }}
      >
        <TouchableOpacity
          onPress={() => {
            toggleVisibility();
            getCountries("");
          }}
        >
          <Entypo
            style={{ alignSelf: "center", justifyContent: "center" }}
            name="cross"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchBar;
