import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isTypeStarted: false,
    inputText: "",
};

const inputTextSlice = createSlice({
    name: "inputText",
    initialState: initialState,
    reducers: {
        setIsTypeStarted: (state, action) => {
            state.isTypeStarted = action.payload;
        },
        setInputText: (state, action) => {
            state.inputText = action.payload.toLowerCase();
        },
    },
});

export const { setIsTypeStarted, setInputText } = inputTextSlice.actions;
export default inputTextSlice.reducer;
