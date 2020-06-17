import { useEffect, useState } from "react";
import service from "../api/service";

export default () => {
  const [countryDetail, setCountryDetail] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const getCountryDetail = async countryName => {
    try {
      const response = await service.get(`/countries/${countryName}`, {
        params: {
          yesterday: "true"
        }
      });
      // setCountryDetail(response.data);
      return response.data;
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return [getCountryDetail, countryDetail, errorMessage];
};
