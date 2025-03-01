/**
 * @jest-environment jsdom
 */

import {render, screen} from "@testing-library/react";
import {FormWrapper} from "./FormWrapper";
import "@testing-library/jest-dom";

// Mock child components
jest.mock("../NewItemForm/NewItemForm.tsx", () => ({
    NewItemForm: ({onSubmit}: any) => (
        <button data-testid="new-item-form" onClick={() => onSubmit({title: "Test Task"})}>
            New Item Form
        </button>
    ),
}));

jest.mock("../EditItemForm/EditItemForm.tsx", () => ({
    EditItemForm: ({onSubmitChanges, onDelete, onConfirm}: any) => (
        <div data-testid="edit-item-form">
            <button onClick={() => onSubmitChanges({title: "Updated Task"})}>Edit Submit</button>
            <button onClick={() => onDelete({title: "Delete Task"})}>Delete</button>
            <button onClick={() => onConfirm({title: "Completed Task"})}>Complete</button>
        </div>
    ),
}));

describe("FormWrapper", () => {
    const mockHandleSubmit = jest.fn();
    const mockHandleSubmitEdit = jest.fn();
    const mockHandleItemDelete = jest.fn();
    const mockHandleItemCompleted = jest.fn();

    const itemForEdit = {
        id: "1",
        title: "Existing Task",
        description: "Test description",
        dueDate: new Date(),
        status: "ACTIVE",
    };

    test("renders 'New Task' when activeForm is NEW", () => {
        render(
            <FormWrapper
                itemForEdit={undefined}
                activeForm="NEW"
                handleSubmit={mockHandleSubmit}
                handleSubmitEdit={mockHandleSubmitEdit}
                handleItemDelete={mockHandleItemDelete}
                handleItemCompleted={mockHandleItemCompleted}
            />
        );

        expect(screen.getByText("New Task:")).toBeInTheDocument();
        expect(screen.getByTestId("new-item-form")).toBeInTheDocument();
    });

    test("renders 'Task: Existing Task' and EditItemForm when activeForm is EDIT", () => {
        render(
            <FormWrapper
                itemForEdit={itemForEdit}
                activeForm="EDIT"
                handleSubmit={mockHandleSubmit}
                handleSubmitEdit={mockHandleSubmitEdit}
                handleItemDelete={mockHandleItemDelete}
                handleItemCompleted={mockHandleItemCompleted}
            />
        );

        expect(screen.getByText("Task: Existing Task")).toBeInTheDocument();
        expect(screen.getByTestId("edit-item-form")).toBeInTheDocument();
    });

    test("renders 'No task selected' when activeForm is NONE", () => {
        render(
            <FormWrapper
                itemForEdit={undefined}
                activeForm="NONE"
                handleSubmit={mockHandleSubmit}
                handleSubmitEdit={mockHandleSubmitEdit}
                handleItemDelete={mockHandleItemDelete}
                handleItemCompleted={mockHandleItemCompleted}
            />
        );

        expect(screen.getByText("No task selected")).toBeInTheDocument();
    });

    test("calls handleSubmit when NewItemForm submits", () => {
        render(
            <FormWrapper
                itemForEdit={undefined}
                activeForm="NEW"
                handleSubmit={mockHandleSubmit}
                handleSubmitEdit={mockHandleSubmitEdit}
                handleItemDelete={mockHandleItemDelete}
                handleItemCompleted={mockHandleItemCompleted}
            />
        );

        screen.getByText("New Item Form").click();
        expect(mockHandleSubmit).toHaveBeenCalledWith({title: "Test Task"});
    });

    test("calls correct handlers when EditItemForm buttons are clicked", () => {
        render(
            <FormWrapper
                itemForEdit={itemForEdit}
                activeForm="EDIT"
                handleSubmit={mockHandleSubmit}
                handleSubmitEdit={mockHandleSubmitEdit}
                handleItemDelete={mockHandleItemDelete}
                handleItemCompleted={mockHandleItemCompleted}
            />
        );

        screen.getByText("Edit Submit").click();
        expect(mockHandleSubmitEdit).toHaveBeenCalledWith({title: "Updated Task"});

        screen.getByText("Delete").click();
        expect(mockHandleItemDelete).toHaveBeenCalledWith({title: "Delete Task"});

        screen.getByText("Complete").click();
        expect(mockHandleItemCompleted).toHaveBeenCalledWith({title: "Completed Task"});
    });
});
