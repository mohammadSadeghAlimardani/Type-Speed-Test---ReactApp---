import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { useEffect } from "react";
import turtle_img from "../assets/images/turtle.png";
import octopus_img from "../assets/images/octopus.png";
import tyrannosaurusRex_img from "../assets/images/tyrannosaurus-rex.png";
import {
    setResultFinalText,
    setResultSrcImg,
    setResultTitle,
} from "../features/result/resultSlice";

const Modal = () => {
    const { isModalOpen } = useSelector((state) => state.statesOfModal);

    const {
        WPM,
        CPM,
        howManyTimesTypedWrong,
        resultSrcImg,
        resultTitle,
        resultFinalText,
    } = useSelector((state) => state.statesOfResult);

    const accuracy = ((CPM - howManyTimesTypedWrong) / CPM) * 100 || 0;

    const dispatch = useDispatch();

    useEffect(() => {
        if (WPM <= 30) {
            dispatch(setResultSrcImg(turtle_img));
            dispatch(setResultTitle("You're a Turtle"));
            dispatch(setResultFinalText("it could be better!"));
        } else if (WPM > 30 && WPM <= 50) {
            dispatch(setResultSrcImg(tyrannosaurusRex_img));
            dispatch(setResultTitle("You're a T-REX"));
            dispatch(setResultFinalText("Keep practicing!"));
        } else {
            dispatch(setResultSrcImg(octopus_img));
            dispatch(setResultTitle("You're a Octopus"));
            dispatch(setResultFinalText("Good job!"));
        }
    }, [WPM]);

    return (
        <div className={isModalOpen ? "modal show-modal" : "modal"}>
            <div className="section-center modal-content">
                <img src={resultSrcImg} alt="result_img" />
                <article>
                    <h3>{resultTitle}</h3>
                    <p>
                        Nice! You type with the speed of{" "}
                        <strong>{WPM} WPM</strong> (
                        {CPM - howManyTimesTypedWrong} CPM). Your accuracy was{" "}
                        <strong>{accuracy.toFixed(2)}%</strong>.{" "}
                        {resultFinalText}
                    </p>
                </article>
            </div>
        </div>
    );
};

export default Modal;
