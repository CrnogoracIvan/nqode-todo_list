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
        userId: 'user1',
        id: "1",
        title: "Test Task",
        description: "This is a test task",
        dueDate: new Date(),
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
    });

    test("calls onClick when clicked", () => {
        render(
            <Item item={testItem} onClick={mockOnClick} selectedItemId={undefined}/>
        );

        const itemElement = screen.getByText(testItem.title);
        fireEvent.click(itemElement);

        expect(mockOnClick).toHaveBeenCalledWith(testItem);
    });

    test("does not display checkmark for non-completed tasks", () => {
        render(
            <Item item={testItem} onClick={mockOnClick} selectedItemId={undefined}/>
        );

        expect(screen.queryByRole("img")).toBeNull(); // No checkmark for non-completed tasks
    });
});
