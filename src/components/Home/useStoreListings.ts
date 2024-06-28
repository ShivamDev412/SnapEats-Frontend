import { RootState } from "@/redux/Store";
import { useGetStoresQuery } from "@/redux/slice/api/user/homeSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useStorListings = () => {
  const { coords, foodType } = useSelector((state: RootState) => state.search);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let query = "";
    if (coords.lat && coords.lon) {
      query = `?lat=${coords.lat}&lon=${coords.lon}`;
    }
    if (foodType !== "") {
      query += `&foodType=${foodType}`;
    }
    setQuery(query);
  }, [coords, foodType]);

  const { data: stores, isLoading } = useGetStoresQuery(query, {
    skip: query === "",
  });

  return { stores, isLoading };
};

export default useStorListings;
