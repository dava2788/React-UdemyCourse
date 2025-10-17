import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import SearchBar from "./SearchBar";

describe('SearchBar', () => {
    test('Should render searchBar Correctly', () => {

        const { container } = render(<SearchBar label={"Test"} placeHolder={"Test"} onQuery={() => { }} />);

        expect(container).toMatchSnapshot();
        expect(screen.getByRole('textbox')).toBeDefined();
        expect(screen.getByRole('button')).toBeDefined();

    });

    test('SHould call OnQuery with Correct Values after 700ms', async () => {
        const onQuery = vi.fn();
        render(<SearchBar label={"Test"} placeHolder={"Test"} onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test' } });

        //Esperara que el onQuery fue llamado
        await waitFor(() => {
            expect(onQuery).toHaveBeenCalled();
            expect(onQuery).toHaveBeenCalledWith('test');
        });

    });

    test('SHould call only once with the last value (debaounce)', async () => {
        const onQuery = vi.fn();
        render(<SearchBar label={"test2"} placeHolder={"test2"} onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 't' } });
        fireEvent.change(input, { target: { value: 'te' } });
        fireEvent.change(input, { target: { value: 'tes' } });
        fireEvent.change(input, { target: { value: 'test' } });
        fireEvent.change(input, { target: { value: 'test2' } });

        //Esperara que el onQuery fue llamado
        await waitFor(() => {
            expect(onQuery).toHaveBeenCalledTimes(1);
            expect(onQuery).toHaveBeenCalledWith('test2');
        });
    });

    test('SHould call onQuery when button Clicked with Input Value', () => {
        const onQuery = vi.fn();
        render(<SearchBar label={"test2"} placeHolder={"test2"} onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test3' } });

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(onQuery).toHaveBeenCalledTimes(1);
        expect(onQuery).toHaveBeenCalledWith('test3');

    });

    test('SHould the input has the correct placeholder value', () => {
        const placeHolderValue = 'Test_PlaceHolder';
        render(<SearchBar label={"test2"} placeHolder={placeHolderValue} onQuery={() => { }} />);

        expect(screen.getByPlaceholderText(placeHolderValue)).toBeDefined();
    });
})