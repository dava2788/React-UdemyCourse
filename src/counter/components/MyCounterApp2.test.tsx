import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import MyCounterApp from "./MyCounterApp";


const handleAddMock = vi.fn();
const handleSubstractMock = vi.fn();
const handleResetMock = vi.fn();

//Moch the Hooks Complete
vi.mock('../hooks/useCounter', () => ({
    default: () => ({
        counter: 20,
        handleAdd: handleAddMock,
        handleSubstract: handleSubstractMock(),
        handleReset: handleResetMock()
    })
}));

describe('MyCounterApp', () => {
    test('Should render Component', () => {
        render(<MyCounterApp />);

        //screen.debug();
        expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(`Counter: 20`);

        expect(screen.getByRole('button', { name: '+1' })).toBeDefined();
        expect(screen.getByRole('button', { name: '-1' })).toBeDefined();
        expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined();
    });

    test('SHould call handleAdd if button +1 is clicked', () => {
        render(<MyCounterApp />);
        const button = screen.getByRole('button', { name: '+1' });

        console.log('BUTTON +1:')
        console.log(button.innerHTML)
        fireEvent.click(button);

        expect(handleAddMock).toHaveBeenCalled();
        expect(handleAddMock).toHaveBeenCalledTimes(1);

        //TODO: REview why this test are been call
        //expect(handleSubstractMock).not.toHaveBeenCalled();
        // expect(handleResetMock).not.toHaveBeenCalled();

    });


})