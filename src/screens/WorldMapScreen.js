import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Animated,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Alert
} from "react-native";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import useCoordinates from "../hooks/useCoordinates";
import CustomMarker from "../components/CustomMarker";
import CountryDetailScreen from "./CountryDetailScreen";

export default WorldMapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [getCoordinates, coordinates, errorMessage] = useCoordinates();
  const [modalData, setModalData] = useState([false, ""]);

  const openCountryDetailModal = countryName => {
    if (countryName == "") {
      setModalData([false, countryName]);
    } else {
      setModalData([true, countryName]);
    }
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

  console.log("current location =>", location);

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
            latitudeDelta: 30.0,
            longitudeDelta: 30.0
          }}
          clusterColor="#F84849"
        >
          {coordinates == undefined || null
            ? null
            : coordinates.map(marker => (
                <Marker
                  coordinate={marker.coordinates}
                  tracksViewChanges={false}
                  onPress={() => {
                    openCountryDetailModal(marker.country);
                  }}
                >
                  <CustomMarker data={marker} />
                </Marker>
              ))}
        </MapView>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: 100
  },
  modalStyle: {
    flex: 1
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject
  }
});
