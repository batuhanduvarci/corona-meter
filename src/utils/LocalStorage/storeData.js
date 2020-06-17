import { AsyncStorage } from "react-native";

export default async (key, value) => {
  try {
    if (typeof value == "object") {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } else if (typeof value == "string") {
      await AsyncStorage.setItem(key, value);
    } else {
      console.log("Unsupported File Type");
    }
  } catch (e) {
    // saving error
    console.log(e);
  }
};
