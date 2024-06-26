import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coords: {
    lat: 0,
    lon: 0,
  },
  foodType: "",
};
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setCoords: (state, action) => {
      state.coords = action.payload;
    },
    setFoodType: (state, action) => {
      state.foodType = action.payload;
    },
  },
});
export const { setCoords, setFoodType } = searchSlice.actions;
export default searchSlice.reducer;
