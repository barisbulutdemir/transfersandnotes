// features/country/countrySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface CountryState {
  selectedCountry?: string;
}

// Define the initial state using that type
const initialState: CountryState = {
  selectedCountry: undefined,
};

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    // Action to set the selected country
    setSelectedCountry: (state, action: PayloadAction<string | undefined>) => {
      state.selectedCountry = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectedCountry } = countrySlice.actions;

export default countrySlice.reducer;
