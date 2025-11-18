import { configureStore } from "@reduxjs/toolkit";
import textSliceReducer from "./features/text/textSlice";
import modalSliceReducer from "./features/modal/modalSlice";
import inputSliceReducer from "./features/inputText/inputTextSlice";
import resultSlice from "./features/result/resultSlice";

export const store = configureStore({
    reducer: {
        statesOfText: textSliceReducer,
        statesOfModal: modalSliceReducer,
        statesOfInputText: inputSliceReducer,
        statesOfResult: resultSlice,
    },
});
