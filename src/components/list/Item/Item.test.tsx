/**
 * @jest-environment jsdom
 */

import {fireEvent, render, screen} from "@testing-library/react";
import {Item} from "./Item";
import "@testing-library/jest-dom";
import {IListItem} from "../../../types.ts";

describe("Item Component", () => {
    const mockOnClick = jest.fn();

    const testItem: IListItem = {
        id: "1",
        title: "Test Task",
        description: "This is a test task",
        dueDate: new Date().toISOString(),
        status: "ACTIVE",
    };

    beforeEach(() => {
        mockOnClick.mockClear();
    });

    test("renders item correctly", () => {
        render(
            <Item item={testItem} onClick={mockOnClick} selectedItemId={undefined}/>
        );

        expect(screen.getByText(testItem.title)).toBeInTheDocument();
        expect(screen.getByText(new Date(testItem.dueDate).toLocaleDateString('sr-RS'))).toBeInTheDocument();
        expect(screen.getByText("›")).toBeInTheDocument(); // This checks the `BiChevronRight` icon
    });

    test("calls onClick when clicked", () => {
        render(
            <Item item={testItem} onClick={mockOnClick} selectedItemId={undefined}/>
        );

        const itemElement = screen.getByText(testItem.title);
        fireEvent.click(itemElement);

        expect(mockOnClick).toHaveBeenCalledWith(testItem);
    });

    test("applies bottom border style when selected", () => {
        render(
            <Item item={testItem} onClick={mockOnClick} selectedItemId="1"/>
        );

        const itemElement = screen.getByText(testItem.title);
        expect(itemElement).toHaveClass('border-b-amber-300');
    });

    test("does not apply bottom border style when not selected", () => {
        render(
            <Item item={testItem} onClick={mockOnClick} selectedItemId="2"/>
        );

        const itemElement = screen.getByText(testItem.title);
        expect(itemElement).toHaveClass('border-b-gray-200');
    });

    test("displays checkmark for completed tasks", () => {
        const completedItem: IListItem = {...testItem, status: "COMPLETED"};
        render(
            <Item item={completedItem} onClick={mockOnClick} selectedItemId={undefined}/>
        );

        expect(screen.getByRole("img")).toHaveClass("text-green-500"); // Checks for the checkmark icon
    });

    test("does not display checkmark for non-completed tasks", () => {
        render(
            <Item item={testItem} onClick={mockOnClick} selectedItemId={undefined}/>
        );

        expect(screen.queryByRole("img")).toBeNull(); // No checkmark for non-completed tasks
    });
});
