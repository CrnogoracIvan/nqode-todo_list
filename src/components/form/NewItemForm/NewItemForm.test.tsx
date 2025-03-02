/**
 * @jest-environment jsdom
 */

import {fireEvent, render, screen} from "@testing-library/react";
import {NewItemForm} from "./NewItemForm";
import "@testing-library/jest-dom";
import {mockDummyData} from "../../../mocks/dummyData.ts";

// Mock child components
jest.mock("../../_foundation/FoundationInput/FoundationInput.tsx", () => ({
    FoundationInput: ({label, value, onChangeValue}: any) => (
        <input
            aria-label={label}
            value={value}
            onChange={(e) => onChangeValue(e.target.value)}
        />
    ),
}));

jest.mock("../../_foundation/FoundationDatePicker/FoundationDatePicker.tsx", () => ({
    FoundationDatePicker: ({onChange}: any) => (
        <input
            type="date"
            aria-label="Due Date"
            onChange={(e) => onChange(new Date(e.target.value))}
        />
    ),
}));

jest.mock("../../_foundation/FoundationButton/FoundationButton.tsx", () => ({
    FoundationButton: ({label, onClick, disabled}: any) => (
        <button onClick={onClick} disabled={disabled}>
            {label}
        </button>
    ),
}));

describe("NewItemForm", () => {
    test("renders inputs and button", () => {
        render(<NewItemForm dummyData={mockDummyData} onSubmit={jest.fn()}/>);

        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
        expect(screen.getByText(/save task/i)).toBeDisabled(); // Button should be disabled initially
    });

    test("enables submit button when all fields are filled", () => {
        render(<NewItemForm dummyData={mockDummyData} onSubmit={jest.fn()}/>);

        fireEvent.change(screen.getByLabelText(/title/i), {target: {value: "New Task"}});
        fireEvent.change(screen.getByLabelText(/description/i), {target: {value: "Task description"}});

        expect(screen.getByText(/save task/i)).toBeEnabled();
    });

    test("calls onSubmit with correct data when form is submitted", () => {
        const mockOnSubmit = jest.fn();
        render(<NewItemForm dummyData={mockDummyData} onSubmit={mockOnSubmit}/>);

        fireEvent.change(screen.getByLabelText(/title/i), {target: {value: "New Task"}});
        fireEvent.change(screen.getByLabelText(/description/i), {target: {value: "Task description"}});
        fireEvent.change(screen.getByLabelText(/due date/i), {target: {value: "2025-03-01"}});

        fireEvent.click(screen.getByText(/save task/i));

        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith(
            expect.objectContaining({
                title: "New Task",
                description: "Task description",
                status: "ACTIVE",
            })
        );
    });

    test("resets form after submission", () => {
        render(<NewItemForm dummyData={mockDummyData} onSubmit={jest.fn()}/>);

        const titleInput = screen.getByLabelText(/title/i);
        const descriptionInput = screen.getByLabelText(/description/i);

        fireEvent.change(titleInput, {target: {value: "New Task"}});
        fireEvent.change(descriptionInput, {target: {value: "Task description"}});
        fireEvent.click(screen.getByText(/save task/i));

        expect(titleInput).toHaveValue(""); // Form should reset
        expect(descriptionInput).toHaveValue("");
    });
});
