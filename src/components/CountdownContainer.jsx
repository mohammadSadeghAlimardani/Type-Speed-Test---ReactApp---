import { useEffect, useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../features/modal/modalSlice";

const CountdownContainer = () => {
    const { isTypeStarted } = useSelector((state) => state.statesOfInputText);
    const [stopWatch, setStopWatch] = useState(60);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isTypeStarted) {
            const stopWatchID = setInterval(() => {
                setStopWatch((prevState) => {
                    const newState = prevState - 1;
                    if (newState === 0) {
                        clearInterval(stopWatchID);
                    }
                    return newState;
                });
            }, 1000);
        }
    }, [isTypeStarted]);

    useEffect(() => {
        if (stopWatch === 0) {
            dispatch(openModal());
        }
    }, [stopWatch]);

    return (
        <div className="countdown-container">
            <div className="countdown">
                <section>
                    <h2>{stopWatch}</h2>
                    <h4>seconds</h4>
                </section>
            </div>
        </div>
    );
};

export default CountdownContainer;
