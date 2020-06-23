import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Platform
} from "react-native";
import useCountries from "../hooks/useCountries";
import CountryListItem from "../components/CountryListItem";
import storeData from "../utils/LocalStorage/storeData";
import readData from "../utils/LocalStorage/readData";

export default CountryListScreen = props => {
  const [getCountries, countries, errorMessage] = useCountries();
  const [countryWatchList, setCountryWatchList] = useState(null);

  const navigateToCountryDetail = countryName => {
    props.navigation.navigate("CountryDetail", {
      countryName: countryName
    });
  };

  const showLoading = () => {
    return <ActivityIndicator color="#007AFF" size="large" />;
  };

  const addToWatchList = async countryName => {
    readData("countryWatchList")
      .then(value => {
        if (value == null || undefined) {
          return [countryName];
        } else {
          if (!value.includes(countryName)) {
            value.push(countryName);
          }
        }
        return value;
      })
      .then(data => {
        storeData("countryWatchList", JSON.stringify(data));
        return data;
      })
      .then(item => {
        setCountryWatchList(item);
      });
  };

  const removeFromWatchList = async countryName => {
    readData("countryWatchList")
      .then(value => {
        var filteredArray;
        if (value.includes(countryName)) {
          filteredArray = value.filter(e => e !== countryName);
        }
        return filteredArray;
      })
      .then(data => {
        storeData("countryWatchList", JSON.stringify(data));
        return data;
      })
      .then(item => {
        setCountryWatchList(item);
      });
  };

  useEffect(() => {
    readData("countryWatchList").then(value => {
      setCountryWatchList(value);
    });
  }, []);

  const renderRow = countryName => {
    if (countryWatchList !== null || undefined) {
      if (countryWatchList.includes(countryName)) {
        return (
          <CountryListItem
            countryName={countryName}
            action={navigateToCountryDetail}
            addToWatchListAction={addToWatchList}
            removeFromWatchListAction={removeFromWatchList}
            watchState={true}
          />
        );
      } else {
        return (
          <CountryListItem
            countryName={countryName}
            action={navigateToCountryDetail}
            addToWatchListAction={addToWatchList}
            watchState={false}
          />
        );
      }
    } else {
      return (
        <CountryListItem
          countryName={countryName}
          action={navigateToCountryDetail}
          addToWatchListAction={addToWatchList}
          watchState={false}
        />
      );
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: Platform.OS === "android" ? 30 : 0 }}
    >
      {countries === undefined ? (
        <View
          style={{
            justifyContent: "center",
            alignSelf: "center",
            position: "absolute",
            top: 0,
            bottom: 0
          }}
        >
          {showLoading()}
        </View>
      ) : (
        <FlatList
          data={countries}
          renderItem={data => renderRow(data.item.countryName)}
          keyExtractor={item => item.id}
          initialNumToRender={15}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 140
  },
  modalStyle: {
    flex: 1
  }
});
