import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CustomHeader from "./CustomHeader";

describe("CustomHeader", () => {
    const titleString = "Carlos Tevez";

    test('Snould Render the title Correctly', () => {
        // ! 1 Arrange
        // Outside of the current test

        // ! 2 Act
        render(<CustomHeader title={titleString} />);
        // ! 3 Assert
        expect(screen.getByText(titleString).innerHTML).toBe(titleString);


    });


    test('Should Render the description Correctly', () => {
        // ! 1 Arrange
        const descriptionString = 'EL Jugador de Pueblo';
        // ! 2 Act
        render(<CustomHeader title={titleString} description={descriptionString} />);
        // ! 3 Assert
        expect(screen.getByText(descriptionString)).toBeDefined();
        expect(screen.getByRole('paragraph')).toBeDefined();
        expect(screen.getByText(descriptionString).innerHTML).toBe(descriptionString);

    });

    test('Should NOT Render description when not Provided', () => {
        // ! 1 Arrange
        // Outside of the current test

        // ! 2 Act
        const { container } = render(<CustomHeader title={titleString} />);
        // ! 3 Assert
        const divElement = container.querySelector('.content-center');
        const h1 = divElement?.querySelector('h1');
        const p = divElement?.querySelector('p');

        expect(h1?.innerHTML).toBe(titleString);
        expect(p?.innerHTML).not.toBeDefined();



    });
})