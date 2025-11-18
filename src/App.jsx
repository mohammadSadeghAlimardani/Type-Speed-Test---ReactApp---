import { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchText } from "./features/text/textSlice";
import Title from "./components/Title";
import CountdownContainer from "./components/CountdownContainer";
import Text from "./components/Text";
import InputText from "./components/InputText";
import Loading from "./components/Loading";
import Error from "./components/Error";
import Modal from "./components/Modal";

const App = () => {
    const { isLoading, isError } = useSelector((state) => state.statesOfText);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchText());
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <Error />;
    }

    return (
        <main>
            <Modal />
            <div className="section-center app-center">
                <Title />
                <CountdownContainer />
                <Text />
                <InputText />
            </div>
        </main>
    );
};

export default App;
