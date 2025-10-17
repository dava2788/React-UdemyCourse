import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import MyCounterApp from "./MyCounterApp";

describe('MyCounterApp.tsx', () => {
    test('should REnder Component', () => {
        render(<MyCounterApp />);
        screen.debug();
        expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(`Counter: 10`);

        expect(screen.getByRole('button', { name: '+1' })).toBeDefined();
        expect(screen.getByRole('button', { name: '-1' })).toBeDefined();
        expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined();
    });

    test('Should increment the Counter', () => {
        render(<MyCounterApp />);

        const labeH1 = screen.getByRole('heading', { level: 1 });
        const button = screen.getByRole('button', { name: '+1' });

        fireEvent.click(button);

        expect(labeH1.innerHTML).toContain('Counter: 11');

    });

    test('Should decrement the Counter', () => {
        render(<MyCounterApp />);

        const labeH1 = screen.getByRole('heading', { level: 1 });
        const button = screen.getByRole('button', { name: '-1' });

        fireEvent.click(button);

        expect(labeH1.innerHTML).toContain('Counter: 9');

    });
})