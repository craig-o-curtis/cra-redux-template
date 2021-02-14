import { createSlice } from "@reduxjs/toolkit";
import { name } from "faker";

const randomAnnoyingData = () =>
  Array.from({ length: 2000 }).map(() => ({
    name: name.findName(),
    // job: name.jobTitle,
  }));

const textDebounceSlice = createSlice({
  name: "text",
  initialState: {
    text: "",
    arr: randomAnnoyingData(),
    arr1: randomAnnoyingData(),
    arr2: randomAnnoyingData(),
    arr3: randomAnnoyingData(),
  },
  reducers: {
    updateStoreText(store, { payload: txt }) {
      // store.text = txt;
      return {
        ...store,
        text: txt,
      };
    },
  },
});

export const { updateStoreText } = textDebounceSlice.actions;

export const selectText = (store) => store.text.text;

export default textDebounceSlice.reducer;
