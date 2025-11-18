import React, { useEffect } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import {
    setIsTypingWrong,
    increaseActiveWordIndex,
    pushWrongWordIndexes,
} from "../features/text/textSlice";
import { setInputText } from "../features/inputText/inputTextSlice";
import {
    increaseWPM,
    increaseCPM,
    increaseHowManyTimesTypedWrong,
} from "../features/result/resultSlice";

const Text = () => {
    const { inputText } = useSelector((state) => state.statesOfInputText);
    const {
        text,
        wordsOfText,
        activeWordIndex,
        activeWord,
        isTypingWrong,
        wrongWordIndexes,
    } = useSelector((state) => state.statesOfText);

    const dispatch = useDispatch();

    useEffect(() => {
        if (text && inputText) {
            const lastInputChar = inputText[inputText.length - 1];
            if (lastInputChar === " ") {
                if (inputText.trim() === activeWord) {
                    dispatch(increaseWPM());
                } else {
                    dispatch(pushWrongWordIndexes(activeWordIndex));
                    dispatch(setIsTypingWrong(false));
                }
                dispatch(increaseActiveWordIndex());
                dispatch(setInputText(""));
            } else if (!activeWord.startsWith(inputText)) {
                dispatch(setIsTypingWrong(true));
                dispatch(increaseHowManyTimesTypedWrong());
            } else {
                dispatch(setIsTypingWrong(false));
                dispatch(increaseCPM(1));
            }
        }
    }, [text, inputText]);

    return (
        <div className="text">
            <p>
                {wordsOfText.map((wordOfText, index) => {
                    if (index === activeWordIndex) {
                        if (isTypingWrong) {
                            return (
                                <React.Fragment key={nanoid()}>
                                    <span className="active-word-wrong">
                                        {wordOfText}
                                    </span>{" "}
                                </React.Fragment>
                            );
                        } else {
                            return (
                                <React.Fragment key={nanoid()}>
                                    <span className="active-word-default">
                                        {wordOfText}
                                    </span>{" "}
                                </React.Fragment>
                            );
                        }
                    } else if (index < activeWordIndex) {
                        if (wrongWordIndexes.includes(index)) {
                            return (
                                <React.Fragment key={nanoid()}>
                                    <span className="active-word-wrong">
                                        {wordOfText}
                                    </span>{" "}
                                </React.Fragment>
                            );
                        } else {
                            return (
                                <React.Fragment key={nanoid()}>
                                    <span className="active-word-correct">
                                        {wordOfText}
                                    </span>{" "}
                                </React.Fragment>
                            );
                        }
                    }
                    //if you want to every word will show after when previous word was typed, you can remove below return
                    return (
                        <React.Fragment key={nanoid()}>
                            <span>{wordOfText}</span>{" "}
                        </React.Fragment>
                    );
                })}
            </p>
        </div>
    );
};

export default Text;
