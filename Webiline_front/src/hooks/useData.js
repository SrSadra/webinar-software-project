import React, { useEffect, useState } from "react";
import apiClient from "../utils/api-client";
import { data } from "react-router-dom";
import { set } from "react-hook-form";

const useData = (endpoint, customConfig, deps) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsloading] = useState(false);

  useEffect(
    () => {
      setIsloading(true);
      apiClient
        .get(endpoint, customConfig)
        .then((res) => {
          if (
            endpoint === "/products" &&
            data &&
            data.products &&
            customConfig.params.page !== 1
          ) {
            setData((prev) => ({
              ...prev,
              products: [...prev.products, ...res.data.products],
            }));
          } else {
            setData(res.data);
          }
          setIsloading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsloading(false);
        });
    },
    deps ? deps : []
  );
  return { data, error, isLoading };
};

export default useData;
