/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react';
import {FoundationButton} from './FoundationButton';
import '@testing-library/jest-dom'


describe('FoundationButton', () => {

    test('renders the button with the correct label', () => {
        render(<FoundationButton label="Submit" type="SUBMIT" onClick={jest.fn()}/>);

        const button = screen.getByText('Submit');
        expect(button).toBeInTheDocument();
    });

    test('applies the correct styles for "SUBMIT" type', () => {
        render(<FoundationButton label="Submit" type="SUBMIT" onClick={jest.fn()}/>);
        const button = screen.getByText('Submit');
        expect(button).toHaveClass('bg-amber-300');
        expect(button).toHaveClass('hover:bg-amber-500');
    });

    test('applies the correct styles for "CANCEL" type', () => {
        render(<FoundationButton label="Cancel" type="CANCEL" onClick={jest.fn()}/>);
        const button = screen.getByText('Cancel');
        expect(button).toHaveClass('bg-red-500');
        expect(button).toHaveClass('hover:bg-red-700');
    });

    test('applies the correct styles for "SUCCESS" type', () => {
        render(<FoundationButton label="Success" type="SUCCESS" onClick={jest.fn()}/>);
        const button = screen.getByText('Success');
        expect(button).toHaveClass('bg-green-500');
        expect(button).toHaveClass('hover:bg-green-700');
    });

    test('disables the button when disabled prop is true', () => {
        render(<FoundationButton label="Submit" type="SUBMIT" onClick={jest.fn()} disabled={true}/>);
        const button = screen.getByText('Submit');
        expect(button).toBeDisabled();
        expect(button).toHaveClass('disabled:pointer-events-none');
        expect(button).toHaveClass('disabled:opacity-50');
    });

    test('does not disable the button when disabled prop is false', () => {
        render(<FoundationButton label="Submit" type="SUBMIT" onClick={jest.fn()} disabled={false}/>);
        const button = screen.getByText('Submit');
        expect(button).not.toBeDisabled();
    })
})