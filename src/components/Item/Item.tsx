import {BiChevronRight} from "react-icons/bi";
import {IListItem} from "../../types.ts";

interface IProps {
    item: IListItem;
    onClick: (item: IListItem) => void;
}

export const Item = ({item, onClick}: IProps) => {
    return (
        <div
            className={'flex flex-row cursor-pointer items-center justify-between mt-4 py-2 border-b hover:border-amber-300'}
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