import { useEffect, useState } from "react";
import service from "../api/service";

export default () => {
  const [coordinates, setCoordinates] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const parseCoordinates = data => {
    var countryList = [];
    data.map(item => {
      countryList.push({
        country: item.country,
        cases: item.cases,
        coordinates: {
          latitude: item.countryInfo.lat,
          longitude: item.countryInfo.long
        }
      });
    });
    return countryList;
  };

  const getCoordinates = async () => {
    try {
      const response = await service.get(`/countries`, {
        params: {
          yesterday: "true",
          strict: "false",
          allowNull: "false"
        }
      });
      setCoordinates(parseCoordinates(response.data));
    } catch (error) {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    getCoordinates();
  }, []);

  return [getCoordinates, coordinates, errorMessage];
};
