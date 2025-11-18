import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import {
    setIsTypeStarted,
    setInputText,
} from "../features/inputText/inputTextSlice";
import { useEffect, useRef } from "react";

const InputText = () => {
    const { isModalOpen } = useSelector((state) => state.statesOfModal);
    const { inputText } = useSelector((state) => state.statesOfInputText);
    const dispatch = useDispatch();

    const handleInputText = (event) => {
        dispatch(setIsTypeStarted(true));
        dispatch(setInputText(event.target.value));
    };

    const inputRef = useRef(null);

    useEffect(() => {
        if (isModalOpen) {
            inputRef.current.blur();
        }
    }, [isModalOpen]);

    return (
        <div className="input-text">
            <input
                type="text"
                name="input-text"
                id="input-text"
                value={inputText}
                onChange={handleInputText}
                placeholder="start type here"
                ref={inputRef}
            />
        </div>
    );
};

export default InputText;
