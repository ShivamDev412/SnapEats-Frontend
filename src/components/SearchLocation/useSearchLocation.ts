import { useGooglePlaces } from "@/CommonHooks/useGooglePlaces";
import { useState } from "react";
export const useSearchLocation = (setValue: Function, id: String) => {
  const [locationInput, setInputLocation] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = useGooglePlaces();

  const handleLocationSelect = (placeId: string, placeAddress: string) => {
    placesService?.getDetails({ placeId }, (placeDetails: any) => {
      setValue(id, placeAddress);
      setValue("lat", placeDetails.geometry.location.lat());
      setValue("lon", placeDetails.geometry.location.lng());
      setInputLocation(placeAddress);
    });
    setShowLocationDropdown(false);
    placePredictions.length = 0;
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (placePredictions.length) {
      setShowLocationDropdown(true);
    }

    setInputLocation(value);
    getPlacePredictions({ input: value });
  };
  return {
    locationInput,
    placePredictions,
    isPlacePredictionsLoading,
    handleLocationSelect,
    showLocationDropdown,
    onChangeHandler,
  };
};
