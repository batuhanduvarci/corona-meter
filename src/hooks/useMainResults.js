import { useEffect, useState } from "react";
import service from "../api/service";

export default () => {
  const [result, setResult] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const getTotalCases = async () => {
    try {
      const response = await service.get("/all", {
        params: {
          yesterday: "true"
        }
      });
      setResult(response.data);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    getTotalCases();
  }, []);

  return [getTotalCases, result, errorMessage];
};
