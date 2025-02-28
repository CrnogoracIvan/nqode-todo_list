import {BiChevronRight} from "react-icons/bi";
import {IListItem} from "../../types.ts";

interface IProps {
    item: IListItem;
    onClick: (item: IListItem) => void;
    selectedItemId: string | undefined;
}

export const Item = ({item, onClick, selectedItemId}: IProps) => {
    const bottomBorder = selectedItemId === item.id ? 'border-b-amber-300' : 'border-b-gray-200'
    return (
        <div
            className={`flex flex-row cursor-pointer items-center justify-between mt-4 py-2 hover:border-amber-500 ${bottomBorder} border-b`}
            onClick={() => {
                onClick(item)
            }}
        >
            <p className={'ml-1'}>
                {item.title}
            </p>
            <BiChevronRight/>
        </div>
    )
}