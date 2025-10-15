import { useState } from "react";


export default function useCounter(initialValue: number = 10) {
    const [counter, setCounter] = useState(initialValue);

    function handleAdd() {
        setCounter(counter + 1);
    };

    function handleSubstract() {
        //PrevState is dispara el valor actual
        setCounter((prevState) => prevState - 1);
    };

    function handleReset() {
        setCounter(initialValue);
    }

    //
    return {
        //Values /Properties
        counter: counter,

        //Methods/Actions
        handleAdd,
        handleSubstract,
        handleReset

    }
}
