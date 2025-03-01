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
            <p className={'ml-1 w-4/6'}>
                {item.title}
            </p>
            <div className={'ml-1 w-1/6 flex '}>
                <p>
                    {customizedDate}
                </p>
            </div>
            <div className={'w-1/6 flex justify-end items-center'}>
                {item.status === 'COMPLETED' && <IoMdCheckmarkCircleOutline className="text-green-500 text-xl"/>}
                <BiChevronRight/>
            </div>
        </div>
    )
}