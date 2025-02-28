import {BiPlus} from "react-icons/bi";

interface IProps {
    disabled: boolean;
    onClick: () => void;
}

export const NewItemButton = ({disabled, onClick}: IProps) => {
    return (
        <button
            className={'flex flex-row cursor-pointer items-center my-2 py-4 border-y hover:border-amber-300 w-full disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'}
            onClick={onClick}
            disabled={disabled}
        >
            <BiPlus/>
            <p className={'ml-1'}>
                Add new item
            </p>
        </button>
    )
}