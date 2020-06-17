import { useEffect, useState } from "react";
import service from "../api/service";

export default () => {
  const [countries, setCountries] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const parseCountries = data => {
    var countryList = [];
    if (data.country !== undefined) {
      countryList.push(data.country);
    } else {
      data.map(item => {
        countryList.push(item.country);
      });
    }
    return countryList;
  };

  const getCountries = async countryName => {
    try {
      const response = await service.get(`/countries/${countryName}`, {
        params: {
          yesterday: "true",
          strict: "false",
          allowNull: "false"
        }
      });
      setCountries(parseCountries(response.data));
    } catch (error) {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    getCountries("");
  }, []);

  return [getCountries, countries, errorMessage];
};
