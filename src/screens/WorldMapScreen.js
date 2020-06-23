import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import useCoordinates from "../hooks/useCoordinates";
import CustomMarker from "../components/CustomMarker";

export default WorldMapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [getCoordinates, coordinates, errorMessage] = useCoordinates();

  const navigateToCountryDetail = countryName => {
    navigation.navigate("CountryDetail", {
      countryName: countryName
    });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {errorMessage ? (
        Alert.alert(errorMsg)
      ) : (
        <MapView
          style={styles.mapStyle}
          provider="google"
          initialRegion={{
            latitude: location ? location.latitude : 38.423733,
            longitude: location ? location.longitude : 27.142826,
            latitudeDelta: 15.0,
            longitudeDelta: 15.0
          }}
          clusterColor="#F84849"
          showsUserLocation={true}
        >
          {coordinates == undefined || null
            ? null
            : coordinates.map(marker => (
                <Marker
                  coordinate={marker.coordinates}
                  tracksViewChanges={false}
                  onPress={() => {
                    navigateToCountryDetail(marker.country);
                  }}
                >
                  <CustomMarker data={marker} />
                </Marker>
              ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    ...StyleSheet.absoluteFillObject
  }
});
