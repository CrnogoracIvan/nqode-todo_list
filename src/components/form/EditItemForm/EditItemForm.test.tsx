/**
 * @jest-environment jsdom
 */
import {fireEvent, render, screen} from "@testing-library/react";
import {EditItemForm} from "./EditItemForm";
import "@testing-library/jest-dom";

// Mock Foundation components
jest.mock("../../foundation/FoundationButton/FoundationButton.tsx", () => ({
    FoundationButton: ({onClick, label}: any) => (
        <button data-testid={label} onClick={onClick}>
            {label}
        </button>
    ),
}));

jest.mock("../../foundation/FoundationInput/FoundationInput.tsx", () => ({
    FoundationInput: ({label, value, onChangeValue}: any) => (
        <input
            data-testid={label}
            value={value}
            onChange={(e) => onChangeValue(e.target.value)}
        />
    ),
}));

jest.mock("../../foundation/FoundationDatePicker/FoundationDatePicker.tsx", () => ({
    FoundationDatePicker: ({onChange, value}: any) => (
        <input
            data-testid="date-picker"
            type="date"
            value={value.toISOString().split("T")[0]}
            onChange={(e) => onChange(new Date(e.target.value))}
        />
    ),
}));

describe("EditItemForm", () => {
    const mockSubmitChanges = jest.fn();
    const mockDelete = jest.fn();
    const mockConfirm = jest.fn();

    const item = {
        id: "1",
        title: "Existing Task",
        description: "Test description",
        dueDate: new Date(),
        status: "ACTIVE",
    };

    test("renders EditItemForm correctly", () => {
        render(
            <EditItemForm
                item={item}
                onSubmitChanges={mockSubmitChanges}
                onDelete={mockDelete}
                onConfirm={mockConfirm}
            />
        );

        expect(screen.getByTestId("Title")).toHaveValue("Existing Task");
        expect(screen.getByTestId("Description")).toHaveValue("Test description");
        expect(screen.getByTestId("date-picker")).toBeInTheDocument();
    });

    test("updates form fields", () => {
        render(
            <EditItemForm
                item={item}
                onSubmitChanges={mockSubmitChanges}
                onDelete={mockDelete}
                onConfirm={mockConfirm}
            />
        );

        fireEvent.change(screen.getByTestId("Title"), {
            target: {value: "Updated Task"},
        });
        fireEvent.change(screen.getByTestId("Description"), {
            target: {value: "Updated Description"},
        });

        expect(screen.getByTestId("Title")).toHaveValue("Updated Task");
        expect(screen.getByTestId("Description")).toHaveValue("Updated Description");
    });

    test("calls onSubmitChanges when save button is clicked", () => {
        render(
            <EditItemForm
                item={item}
                onSubmitChanges={mockSubmitChanges}
                onDelete={mockDelete}
                onConfirm={mockConfirm}
            />
        );

        fireEvent.click(screen.getByTestId("Save changes"));
        expect(mockSubmitChanges).toHaveBeenCalledWith({
            id: "1",
            title: "Existing Task",
            description: "Test description",
            dueDate: item.dueDate,
            status: "ACTIVE",
        });
    });

    test("calls onDelete when delete button is clicked", () => {
        render(
            <EditItemForm
                item={item}
                onSubmitChanges={mockSubmitChanges}
                onDelete={mockDelete}
                onConfirm={mockConfirm}
            />
        );

        fireEvent.click(screen.getByTestId("Delete task"));
        expect(mockDelete).toHaveBeenCalledWith(item);
    });

    test("calls onConfirm when mark as completed button is clicked", () => {
        render(
            <EditItemForm
                item={item}
                onSubmitChanges={mockSubmitChanges}
                onDelete={mockDelete}
                onConfirm={mockConfirm}
            />
        );

        fireEvent.click(screen.getByTestId("Mark as completed"));
        expect(mockConfirm).toHaveBeenCalledWith(item);
    });

    test("shows completed message when task is completed", () => {
        render(
            <EditItemForm
                item={{...item, status: "COMPLETED"}}
                onSubmitChanges={mockSubmitChanges}
                onDelete={mockDelete}
                onConfirm={mockConfirm}
            />
        );

        expect(screen.getByText("The task has been completed")).toBeInTheDocument();
    });
});
