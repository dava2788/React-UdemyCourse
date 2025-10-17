import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import useCounter from "./useCounter";

describe("useCounter", () => {
    const initialValue = 20;

    test("Should Initialize with 10 as default Value", () => {
        const { result } = renderHook(() => useCounter());
        expect(result.current.counter).toBe(10);

    });

    test("Should Initialize with 20 as default Value", () => {

        const { result } = renderHook(() => useCounter(initialValue));
        expect(result.current.counter).toBe(initialValue);

    });

    test("Should increment Counter when handleAdd is called", () => {
        const { result } = renderHook(() => useCounter(initialValue));

        //For trigger an event
        act(() => {
            result.current.handleAdd();
        });

        expect(result.current.counter).toBe(initialValue + 1);

    });

    test("Should decrease Counter when handleSubstract is called", () => {
        const { result } = renderHook(() => useCounter(initialValue));

        //For trigger an event
        act(() => {
            result.current.handleSubstract();
        });

        expect(result.current.counter).toBe(initialValue - 1);

    });

    test("Should Reset Counter when handleSubstract and handleAdd is called", () => {
        const { result } = renderHook(() => useCounter(initialValue));

        //For trigger an events
        act(() => { result.current.handleSubstract(); });
        act(() => { result.current.handleSubstract(); });
        act(() => { result.current.handleAdd(); });

        expect(result.current.counter).toBe(initialValue + (-2 + 1));

        //For call Reset
        act(() => { result.current.handleReset(); });

        expect(result.current.counter).toBe(initialValue);

    });
})
