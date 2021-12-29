import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const APIContext = createContext();

export const APIProvider = ({ children }) => {
  const [coinData, setCoinData] = useState();
  const [query, setQuery] = useState("");
  const [coinDetail, setCoinDetail] = useState();

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
      .then((res) => {
        setCoinData(res.data);
      });
  }, [setCoinData]);

  const values = {
    coinData,
    setCoinData,
    query,
    setQuery,
    coinDetail,
    setCoinDetail,
  };

  return <APIContext.Provider value={values}>{children}</APIContext.Provider>;
};

export const useAPI = () => useContext(APIContext);
