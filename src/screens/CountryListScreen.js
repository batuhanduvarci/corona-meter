import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Animated,
  Text,
  Modal,
  ActivityIndicator
} from "react-native";
import useCountries from "../hooks/useCountries";
import Header from "../components/Header";
import CountryListItem from "../components/CountryListItem";
import CountryDetailScreen from "./CountryDetailScreen";
import storeData from "../utils/LocalStorage/storeData";
import readData from "../utils/LocalStorage/readData";
import i18n from "i18n-js";

export default CountryListScreen = () => {
  const [getCountries, countries, errorMessage] = useCountries();
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [modalData, setModalData] = useState([false, ""]);
  const [countryWatchList, setCountryWatchList] = useState(null);

  const tabTitle = i18n.t("country_list_label");

  const openCountryDetailModal = countryName => {
    if (countryName == "") {
      setModalData([false, countryName]);
    } else {
      setModalData([true, countryName]);
    }
  };

  const showLoading = () => {
    return <ActivityIndicator color="#007AFF" size="large" />;
  };

  const addToWatchList = async countryName => {
    readData("countryWatchList")
      .then(value => {
        console.log("value => ", value);
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
        console.log("remove value => ", value);
        if (value.includes(countryName)) {
          filteredArray = value.filter(e => e !== countryName);
          console.log("filtered array => ", filteredArray);
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

  return (
    <Animated.View style={{ flex: 1, justifyContent: "center" }}>
      <Header
        tabTitle={tabTitle}
        scrollY={scrollY}
        isSearchActive={true}
        getCountries={getCountries}
      />
      {countries === undefined ? (
        showLoading()
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: scrollY } } }
          ])}
        >
          <View style={styles.container}>
            {countries === undefined
              ? showLoading()
              : countries.map(item => {
                  if (countryWatchList !== null || undefined) {
                    if (countryWatchList.includes(item)) {
                      return (
                        <CountryListItem
                          countryName={item}
                          action={openCountryDetailModal}
                          addToWatchListAction={addToWatchList}
                          removeFromWatchListAction={removeFromWatchList}
                          watchState={true}
                        />
                      );
                    } else {
                      return (
                        <CountryListItem
                          countryName={item}
                          action={openCountryDetailModal}
                          addToWatchListAction={addToWatchList}
                          watchState={false}
                        />
                      );
                    }
                  } else {
                    return (
                      <CountryListItem
                        countryName={item}
                        action={openCountryDetailModal}
                        addToWatchListAction={addToWatchList}
                        watchState={false}
                      />
                    );
                  }
                })}
          </View>
        </ScrollView>
      )}

      <Modal
        animated={true}
        animationType="fade"
        contentContainerStyle={styles.modalStyle}
        visible={modalData[0]}
        dismissable={true}
      >
        <CountryDetailScreen
          countryName={modalData[1]}
          modalAction={openCountryDetailModal}
        />
      </Modal>
    </Animated.View>
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
