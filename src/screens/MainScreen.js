import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Animated,
  FlatList,
  Alert
} from "react-native";
import CovidContainer from "../components/CovidContainer";
import useMainResults from "../hooks/useMainResults";
import Header from "../components/Header";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import numeral from "numeral";
import storeData from "../utils/LocalStorage/storeData";
import readData from "../utils/LocalStorage/readData";
import WatchListContainer from "../components/WatchListContainer";
import useCountryDetail from "../hooks/useCountryDetail";
import i18n from "i18n-js";
import NetInfo from '@react-native-community/netinfo';

export default MainScreen = ({ navigation }) => {
  const [getTotalCases, result, errorMessage] = useMainResults();
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [parsedData, setParsedData] = useState([]);
  const [parsedCountryDetail, setParsedCountryDetail] = useState([]);
  const [getCountryDetail] = useCountryDetail();

  const tabTitle = i18n.t("bottom_navigator_home");
  const containerTitles = [
    i18n.t("total_case_label"),
    i18n.t("todays_case_label"),
    i18n.t("current_case_label")
  ];

  const numberFormat = i18n.t("number_format");

  const compareValues = (oldValue, newValue) => {
    if (oldValue > newValue) {
      return "decreased";
    } else if (oldValue < newValue) {
      return "increased";
    } else {
      return "equal";
    }
  };

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if(state.isConnected){
        if (result !== undefined) {
          readData("worldCaseCompare")
            .then(item => {
              setParsedData([
                {
                  confirmed: {
                    value: numeral(Number(result.cases)).format(numberFormat),
                    status:
                      item == undefined
                        ? "equal"
                        : compareValues(Number(item.totalConfirmed), result.cases),
                    fieldColor: "#FA8748"
                  },
                  recovered: {
                    value: numeral(Number(result.recovered)).format(numberFormat),
                    status:
                      item == undefined
                        ? "equal"
                        : compareValues(
                            Number(item.totalRecovered),
                            result.recovered
                          ),
                    fieldColor: "#40C12C"
                  },
                  deaths: {
                    value: numeral(Number(result.deaths)).format(numberFormat),
                    status:
                      item == undefined
                        ? "equal"
                        : compareValues(Number(item.totalDeaths), result.deaths),
                    fieldColor: "#F84849"
                  }
                },
                {
                  confirmed: {
                    value: numeral(Number(result.todayCases)).format(numberFormat),
                    status:
                      item == undefined
                        ? "equal"
                        : compareValues(
                            Number(item.todayConfirmed),
                            result.todayCases
                          ),
                    fieldColor: "#FA8748"
                  },
                  deaths: {
                    value: numeral(Number(result.todayDeaths)).format(numberFormat),
                    status:
                      item == undefined
                        ? "equal"
                        : compareValues(
                            Number(item.todayDeaths),
                            result.todayDeaths
                          ),
                    fieldColor: "#F84849"
                  }
                },
                {
                  active: {
                    value: numeral(Number(result.active)).format(numberFormat),
                    status:
                      item == undefined
                        ? "equal"
                        : compareValues(Number(item.currentActive), result.active),
                    fieldColor: "#FA8748"
                  },
                  critical: {
                    value: numeral(Number(result.critical)).format(numberFormat),
                    status:
                      item == undefined
                        ? "equal"
                        : compareValues(
                            Number(item.currentCritical),
                            result.critical
                          ),
                    fieldColor: "#F84849"
                  }
                }
              ]);
            })
            .then(() => {
              storeData("worldCaseCompare", {
                totalConfirmed: result.cases,
                totalRecovered: result.recovered,
                totalDeaths: result.deaths,
                todayConfirmed: result.todayCases,
                todayDeaths: result.todayDeaths,
                currentActive: result.active,
                currentCritical: result.critical
              });
            });
        }
      }else{
        Alert.alert(i18n.t("connection_error_title"), i18n.t("connection_error_message"))
      }
    })
    
    navigation.addListener("focus", () => {
      getWatchList();
    });
  }, [result]);

  const convertDate = date => {
    const dateToConvert = new Date(date);
    return dateToConvert.toLocaleString();
  };

  const getWatchList = async => {
    readData("countryWatchList")
      .then(value => {
        if (value !== null || undefined) {
          return value;
        }
        return null;
      })
      .then(async data => {
        var detailArr = [];
        var detail;
        if (data !== null) {
          for (let index = 0; index < data.length; index++) {
            detail = await getCountryDetail(data[index]);
            detailArr.push({
              id: index,
              country: detail.country,
              confirmed: numeral(detail.cases).format(numberFormat),
              deaths: numeral(detail.deaths).format(numberFormat),
              recovered: numeral(detail.recovered).format(numberFormat),
              flagUri: detail.countryInfo.flag
            });
          }
          return detailArr;
        }
        return null;
      })
      .then(detailArr => {
        if (detailArr !== null) {
          setParsedCountryDetail(detailArr);
        } else {
          setParsedCountryDetail([]);
        }
      });
  };

  const navigateToCountryDetail = countryName => {
    navigation.navigate("CountryDetail", {
      countryName: countryName
    });
  };

  return (
    <Animated.View style={{ flex: 1 }}>
      <Header tabTitle={tabTitle} scrollY={scrollY} />
      <ScrollView
        style={{ flex: 1 }}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } }
        ])}
      >
        <View style={[styles.container, { marginTop: 130 }]}>
          <View style={{ alignItems: "center", marginTop: 8 }}>
            {result === undefined ? (
              <ShimmerPlaceholder style={styles.shimmerStyle} autoRun={true} />
            ) : (
              <Text style={{ color: "dimgray" }}>
                {i18n.t("world_population_label")}{" "}
                {numeral(result.population).format(numberFormat)}
              </Text>
            )}
          </View>
          <View style={{ alignItems: "center", marginTop: 8 }}>
            {result === undefined ? (
              <ShimmerPlaceholder style={styles.shimmerStyle} autoRun={true} />
            ) : (
              <Text style={{ color: "dimgray" }}>
                {i18n.t("total_test_label")}{" "}
                {numeral(result.tests).format(numberFormat)}
              </Text>
            )}
          </View>
          <View>
            <Text style={styles.titleStyle}>{containerTitles[0]}</Text>
            <CovidContainer data={parsedData[0]} />
          </View>
          <View>
            <Text style={styles.titleStyle}>{containerTitles[1]}</Text>
            <CovidContainer data={parsedData[1]} />
          </View>
          <View>
            <Text style={styles.titleStyle}>{containerTitles[2]}</Text>
            <CovidContainer data={parsedData[2]} />
          </View>
          <View style={{ alignItems: "center", marginTop: 8 }}>
            {result === undefined ? (
              <ShimmerPlaceholder style={styles.shimmerStyle} autoRun={true} />
            ) : (
              <Text style={{ color: "dimgray" }}>
                {i18n.t("last_update_label")} {convertDate(result.updated)}
              </Text>
            )}
          </View>
          <View style={{ marginVertical: 6 }}>
            <Text style={styles.titleStyle}>
              {i18n.t("country_watch_label")}
            </Text>
            <FlatList
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent:
                  parsedCountryDetail == [] ? "flex-start" : "center"
              }}
              data={parsedCountryDetail}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={data => (
                <WatchListContainer
                  data={data.item}
                  action={navigateToCountryDetail}
                />
              )}
              keyExtractor={item => item.index}
              ListEmptyComponent={
                <Text
                  style={{
                    alignSelf: "center",
                    justifyContent: "center",
                    color: "dimgrey",
                    marginVertical: 4,
                    marginLeft: 6
                  }}
                >
                  {i18n.t("country_watch_info_label")}
                </Text>
              }
              initialNumToRender={5}
            />
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  titleStyle: {
    margin: 6,
    color: "black",
    fontSize: 16,
    fontWeight: "bold"
  },
  shimmerStyle: { borderRadius: 8 },
  modalStyle: {
    flex: 1
  }
});
