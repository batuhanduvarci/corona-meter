import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Animated,
  Text,
  Modal,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Platform
} from "react-native";
import useCountries from "../hooks/useCountries";
import Header from "../components/Header";
import CountryListItem from "../components/CountryListItem";
import CountryDetailScreen from "./CountryDetailScreen";
import storeData from "../utils/LocalStorage/storeData";
import readData from "../utils/LocalStorage/readData";
import i18n from "i18n-js";

export default CountryListScreen = (props) => {
  const [getCountries, countries, errorMessage] = useCountries();
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [modalData, setModalData] = useState([false, ""]);
  const [countryWatchList, setCountryWatchList] = useState(null);

  
  console.log(props.navigation.navigate)

  const openCountryDetailModal = countryName => {
    // console.log("openCountryDetailModal")
    // if (countryName == "") {
    //   setModalData([false, countryName]);
    // } else {
    //   setModalData([true, countryName]);
    // }
    props.navigation.navigate(CountryDetailScreen, {
      countryName : countryName
    })
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

  const renderRow = countryName => {
    if (countryWatchList !== null || undefined) {
      if (countryWatchList.includes(countryName)) {
        return (
          <CountryListItem
            countryName={countryName}
            action={openCountryDetailModal}
            addToWatchListAction={addToWatchList}
            removeFromWatchListAction={removeFromWatchList}
            watchState={true}
          />
        );
      } else {
        return (
          <CountryListItem
            countryName={countryName}
            action={openCountryDetailModal}
            addToWatchListAction={addToWatchList}
            watchState={false}
          />
        );
      }
    } else {
      return (
        <CountryListItem
          countryName={countryName}
          action={openCountryDetailModal}
          addToWatchListAction={addToWatchList}
          watchState={false}
        />
      );
    }
  };

  const footerComponent = () => {
    // return (
    //   <Modal
    //     animated={true}
    //     animationType="fade"
    //     contentContainerStyle={styles.modalStyle}
    //     visible={modalData[0]}
    //     dismissable={true}
        
    //   >
    //     <CountryDetailScreen
    //       countryName={modalData[1]}
    //       modalAction={openCountryDetailModal}
    //     />
    //   </Modal>
    // );
    return null
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop : Platform.OS === "android" ? 30 : 0 }}>
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
          ListFooterComponent={footerComponent()}
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
