import {BiChevronRight} from "react-icons/bi";

interface IProps {
    itemName: string;
    onClick?: () => void;
}

export const Item = ({itemName}: IProps) => {
    return (
        <div className={'flex flex-row cursor-pointer items-center justify-between mt-4 py-2 border-b hover:border-amber-300'} onClick={()=> {console.log('clicked')}}>
            <p className={'ml-1'}>
                {itemName}
            </p>
            <BiChevronRight />
        </div>
    )
}