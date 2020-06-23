import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  RefreshControl,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useCountryDetail from "../hooks/useCountryDetail";
import CovidContainer from "../components/CovidContainer";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import numeral from "numeral";
import storeData from "../utils/LocalStorage/storeData";
import readData from "../utils/LocalStorage/readData";
import MapView from "react-native-maps";
import GoogleMapsStyle from "../utils/GoogleMapsStyle";
import i18n from "i18n-js";

export default CountryDetailScreen = ({ navigation, route }) => {
  const [getCountryDetail, countryDetail, errorMessage] = useCountryDetail();
  const [refreshing, setRefreshing] = useState(false);
  const [parsedData, setParsedData] = useState([]);
  const [otherData, setOtherData] = useState();
  const countryName = route.params.countryName;
  const numberFormat = i18n.t("number_format");

  const containerTitles = [
    i18n.t("total_case_label"),
    i18n.t("todays_case_label"),
    i18n.t("current_case_label")
  ];

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
    getCountryDetail(countryName).then(response => {
      if (response !== undefined) {
        readData(response.countryInfo.iso2 + "CaseCompare")
          .then(item => {
            setParsedData([
              {
                confirmed: {
                  value: numeral(Number(response.cases)).format(numberFormat),
                  status:
                    item == undefined
                      ? "equal"
                      : compareValues(
                          Number(item.totalConfirmed),
                          response.cases
                        ),
                  fieldColor: "#FA8748"
                },
                recovered: {
                  value: numeral(Number(response.recovered)).format(
                    numberFormat
                  ),
                  status:
                    item == undefined
                      ? "equal"
                      : compareValues(
                          Number(item.totalRecovered),
                          response.recovered
                        ),
                  fieldColor: "#40C12C"
                },
                deaths: {
                  value: numeral(Number(response.deaths)).format(numberFormat),
                  status:
                    item == undefined
                      ? "equal"
                      : compareValues(
                          Number(item.totalDeaths),
                          response.deaths
                        ),
                  fieldColor: "#F84849"
                }
              },
              {
                confirmed: {
                  value: numeral(Number(response.todayCases)).format(
                    numberFormat
                  ),
                  status:
                    item == undefined
                      ? "equal"
                      : compareValues(
                          Number(item.todayConfirmed),
                          response.todayCases
                        ),
                  fieldColor: "#FA8748"
                },
                deaths: {
                  value: numeral(Number(response.todayDeaths)).format(
                    numberFormat
                  ),
                  status:
                    item == undefined
                      ? "equal"
                      : compareValues(
                          Number(item.todayDeaths),
                          response.todayDeaths
                        ),
                  fieldColor: "#F84849"
                }
              },
              {
                active: {
                  value: numeral(Number(response.active)).format(numberFormat),
                  status:
                    item == undefined
                      ? "equal"
                      : compareValues(
                          Number(item.currentActive),
                          response.active
                        ),
                  fieldColor: "#FA8748"
                },
                critical: {
                  value: numeral(Number(response.critical)).format(
                    numberFormat
                  ),
                  status:
                    item == undefined
                      ? "equal"
                      : compareValues(
                          Number(item.currentCritical),
                          response.critical
                        ),
                  fieldColor: "#F84849"
                }
              }
            ]);
            setOtherData({
              flagUri: response.countryInfo.flag,
              countryPopulation: numeral(response.population).format(
                numberFormat
              ),
              totalTestCount: numeral(response.tests).format(numberFormat),
              lastUpdate: convertDate(response.updated),
              latitude: response.countryInfo.lat,
              longitude: response.countryInfo.long
            });
          })
          .then(() => {
            storeData(response.countryInfo.iso2 + "CaseCompare", {
              totalConfirmed: response.cases,
              totalRecovered: response.recovered,
              totalDeaths: response.deaths,
              todayConfirmed: response.todayCases,
              todayDeaths: response.todayDeaths,
              currentActive: response.active,
              currentCritical: response.critical
            });
          });
      }
    });
  }, [countryDetail]);

  const refreshAction = async () => {
    setRefreshing(true);
    await getCountryDetail();
    setRefreshing(false);
  };

  const convertDate = date => {
    const dateToConvert = new Date(date);

    return dateToConvert.toLocaleString();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View
        style={{
          flexDirection: "column"
        }}
      >
        <View
          style={{
            height: 40,
            flexDirection: "row"
          }}
        >
          <View style={{ alignContent: "flex-start" }}>
            <TouchableOpacity
              style={styles.backButtonStyle}
              onPress={() => {
                navigation.pop();
              }}
            >
              <Ionicons
                style={{ alignSelf: "center" }}
                name="ios-arrow-back"
                size={40}
                color="black"
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {countryName.length > 25 ? (
              <Text style={{ fontSize: 16 }}>{countryName}</Text>
            ) : (
              <Text style={{ fontSize: 20 }}>{countryName}</Text>
            )}
          </View>
          <View style={styles.flagContainer}>
            {otherData === undefined ? (
              <ActivityIndicator
                style={{ justifyContent: "center", alignSelf: "center" }}
                color="#007AFF"
              />
            ) : (
              <Image
                style={styles.flagStyle}
                source={{ uri: otherData.flagUri }}
              />
            )}
          </View>
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: "dimgray" }} />
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor="#007AFF"
            enabled={true}
            refreshing={refreshing}
            onRefresh={refreshAction}
          />
        }
      >
        <View style={{ alignItems: "center", marginTop: 8 }}>
          {otherData === undefined ? (
            <ShimmerPlaceholder style={styles.shimmerStyle} autoRun={true} />
          ) : (
            <Text style={{ color: "dimgray" }}>
              {i18n.t("country_population_label")} {otherData.countryPopulation}
            </Text>
          )}
        </View>
        <View style={{ alignItems: "center", marginTop: 8 }}>
          {otherData === undefined ? (
            <ShimmerPlaceholder style={styles.shimmerStyle} autoRun={true} />
          ) : (
            <Text style={{ color: "dimgray" }}>
              {i18n.t("total_test_label")} {otherData.totalTestCount}
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
          {otherData === undefined ? (
            <ShimmerPlaceholder style={styles.shimmerStyle} autoRun={true} />
          ) : (
            <Text style={{ color: "dimgray" }}>
              {i18n.t("last_update_label")} {otherData.lastUpdate}
            </Text>
          )}
        </View>
        <View style={styles.mapContainer}>
          {otherData !== undefined ? (
            <MapView
              style={styles.mapStyle}
              provider="google"
              initialRegion={{
                latitude: otherData.latitude,
                longitude: otherData.longitude,
                latitudeDelta: 10.0,
                longitudeDelta: 10.0
              }}
              customMapStyle={GoogleMapsStyle}
              liteMode={true}
              pitchEnabled={false}
              rotateEnabled={false}
              scrollEnabled={false}
              zoomEnabled={false}
            />
          ) : (
            <ActivityIndicator
              style={{ justifyContent: "center", alignSelf: "center" }}
              color="#007AFF"
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F2F2F2",
    paddingHorizontal: 4,
    paddingTop: Platform.OS === "android" ? 30 : 0
  },
  mapContainer: {
    flex: 1,
    height: 200,
    flexDirection: "row",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
    marginVertical: 12,
    marginHorizontal: 8,
    padding: 8,
    borderRadius: 8,
    justifyContent: "center"
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject
  },
  titleStyle: {
    margin: 6,
    color: "black",
    fontSize: 16,
    fontWeight: "bold"
  },
  shimmerStyle: { borderRadius: 8 },
  backButtonStyle: { width: 40, height: 40, alignSelf: "center" },
  flagContainer: {
    height: 30,
    width: 50,
    alignSelf: "center",
    alignItems: "flex-end"
  },
  flagStyle: {
    height: 30,
    width: 50,
    borderRadius: 8
  }
});
