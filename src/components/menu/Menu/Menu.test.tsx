/**
 * @jest-environment jsdom
 */

import {fireEvent, render, screen} from "@testing-library/react";
import {Menu} from "./Menu.tsx";
import "@testing-library/jest-dom";

describe("menu Component", () => {
    const mockOnItemClick = jest.fn();

    beforeEach(() => {
        mockOnItemClick.mockClear();
    });

    test("renders menu with correct items", () => {
        render(<Menu onItemClick={mockOnItemClick}/>);

        expect(screen.getByText("Menu")).toBeInTheDocument();
        expect(screen.getByText("All")).toBeInTheDocument();
        expect(screen.getByText("Active")).toBeInTheDocument();
        expect(screen.getByText("Completed")).toBeInTheDocument();
    });

    test("has 'All' selected by default", () => {
        render(<Menu onItemClick={mockOnItemClick}/>);
        const allItem = screen.getByText("All");

        expect(allItem).toHaveClass("text-amber-300");
    });

    test("calls onItemClick when an item is clicked and updates active state", () => {
        render(<Menu onItemClick={mockOnItemClick}/>);

        const activeItem = screen.getByText("Active");
        fireEvent.click(activeItem);

        expect(mockOnItemClick).toHaveBeenCalledWith("ACTIVE");
        expect(activeItem).toHaveClass("text-amber-300");

        const allItem = screen.getByText("All");
        expect(allItem).not.toHaveClass("text-amber-300");
    });

    test("highlights 'Completed' when clicked", () => {
        render(<Menu onItemClick={mockOnItemClick}/>);

        const completedItem = screen.getByText("Completed");
        fireEvent.click(completedItem);

        expect(mockOnItemClick).toHaveBeenCalledWith("COMPLETED");
        expect(completedItem).toHaveClass("text-amber-300");

        const activeItem = screen.getByText("Active");
        expect(activeItem).not.toHaveClass("text-amber-300");
    });
});
