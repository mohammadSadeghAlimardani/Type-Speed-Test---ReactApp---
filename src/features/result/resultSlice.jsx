import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    WPM: 0,
    CPM: 0,
    howManyTimesTypedWrong: 0,
    resultSrcImg: "../photo.png",
    resultTitle: "You'Re a Turtle",
    resultFinalText: "it could be better!",
};

const resultSlice = createSlice({
    name: "result",
    initialState: initialState,
    reducers: {
        increaseWPM: (state, action) => {
            state.WPM = state.WPM + 1;
        },
        increaseCPM: (state, action) => {
            state.CPM = state.CPM + action.payload;
        },
        increaseHowManyTimesTypedWrong: (state, action) => {
            state.howManyTimesTypedWrong = state.howManyTimesTypedWrong + 1;
        },
        setResultSrcImg: (state, action) => {
            state.resultSrcImg = action.payload;
        },
        setResultTitle: (state, action) => {
            state.resultTitle = action.payload;
        },
        setResultFinalText: (state, action) => {
            state.resultFinalText = action.payload;
        },
    },
});

export const {
    increaseWPM,
    increaseCPM,
    increaseHowManyTimesTypedWrong,
    setResultSrcImg,
    setResultTitle,
    setResultFinalText,
} = resultSlice.actions;
export default resultSlice.reducer;
