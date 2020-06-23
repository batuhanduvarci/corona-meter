import { useState } from "react";
import service from "../api/service";

export default () => {
  const [errorMessage, setErrorMessage] = useState("");

  const getCountryDetail = async countryName => {
    try {
      const response = await service.get(`/countries/${countryName}`, {
        params: {
          yesterday: "true"
        }
      });
      return response.data;
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return [getCountryDetail, errorMessage];
};
