import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchTextURL = "https://api.npoint.io/3ac538c9d36d074dca3c";

export const fetchText = createAsyncThunk("text/fetchText", async () => {
    try {
        const response = await axios.get(fetchTextURL);
        return response.data;
    } catch (error) {
        return error.response;
    }
});

const initialState = {
    text: "",
    wordsOfText: [],
    activeWord: "",
    activeWordIndex: 0,
    wrongWordIndexes: [],
    isTypingWrong: false,
    isLoading: false,
    isError: false,
};

const textSlice = createSlice({
    name: "text",
    initialState: initialState,
    reducers: {
        setIsTypingWrong: (state, action) => {
            state.isTypingWrong = action.payload;
        },
        increaseActiveWordIndex: (state, action) => {
            state.activeWord = state.wordsOfText[state.activeWordIndex + 1];
            state.activeWordIndex = state.activeWordIndex + 1;
        },
        pushWrongWordIndexes: (state, action) => {
            state.wrongWordIndexes = [
                ...state.wrongWordIndexes,
                action.payload,
            ];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchText.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchText.fulfilled, (state, action) => {
            state.isLoading = false;
            const allTextsArray = action.payload;
            const randomNumber = Math.floor(
                Math.random() * allTextsArray.length
            );
            const text = allTextsArray[randomNumber].text;
            state.text = text;
            const wordsOfText = text.split(" ");
            state.wordsOfText = wordsOfText;
            state.activeWord = wordsOfText[state.activeWordIndex];
        });
        builder.addCase(fetchText.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
});

export const {
    setIsTypingWrong,
    increaseActiveWordIndex,
    pushWrongWordIndexes,
} = textSlice.actions;
export default textSlice.reducer;
