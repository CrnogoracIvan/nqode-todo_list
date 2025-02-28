import {BiPlus} from "react-icons/bi";

interface IProps {
    onClick?: () => void;
}

export const NewItemButton = ({onClick}: IProps) => {
    return (
        <div className={'flex flex-row cursor-pointer items-center my-2 py-4 border-y hover:border-amber-300'} onClick={onClick}>
            <BiPlus />
            <p className={'ml-1'}>
                Add new item
            </p>
        </div>
    )
}