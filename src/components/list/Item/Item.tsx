import {BiChevronRight} from "react-icons/bi";
import {IListItem} from "../../../types.ts";
import {IoMdCheckmarkCircleOutline} from "react-icons/io";

interface IProps {
    item: IListItem;
    onClick: (item: IListItem) => void;
    selectedItemId: string | undefined;
}

export const Item = ({item, onClick, selectedItemId}: IProps) => {
    const bottomBorder = selectedItemId === item.id ? 'border-b-amber-300' : 'border-b-gray-200'
    const customizedDate = new Date(item.dueDate).toLocaleDateString('sr-RS');

    return (
        <div
            className={`flex flex-row cursor-pointer items-center mt-4 py-2 w-full hover:border-amber-500 ${bottomBorder} border-b`}
            onClick={() => {
                onClick(item)
            }}
        >
            <div className={'ml-1 w-[70%] overflow-hidden pr-6'}>
                {item.title}
                <p className={'text-xs text-gray-400 truncate'}>
                    {item.description}
                </p>
            </div>
            <div className={'ml-1 w-[20%] flex'}>
                {customizedDate}
            </div>
            <div className={'w-[10%] flex justify-end items-center'}>
                {item.status === 'COMPLETED' && <IoMdCheckmarkCircleOutline className="text-green-500 text-xl"/>}
                <BiChevronRight/>
            </div>
        </div>
    )
}