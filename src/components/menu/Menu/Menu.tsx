import {RiCheckboxMultipleBlankLine, RiCheckboxMultipleFill, RiCheckboxMultipleLine} from "react-icons/ri";
import {useState} from "react";
import {TMenuItem} from "../../../types.ts";
import {UserInfo} from "../UserInfo/UserInfo.tsx";


interface IProps {
    onItemClick: (menuItem: TMenuItem) => void;
}

export const Menu = ({onItemClick}: IProps) => {
    const [activeItemId, setActiveItemId] = useState<TMenuItem>('ALL')
    const menuItems = [
        {
            id: 'ALL',
            title: 'All',
            onClick: () => {
                setActiveItemId('ALL')
                onItemClick('ALL')
            },
            icon: <RiCheckboxMultipleFill/>
        },
        {
            id: 'ACTIVE',
            title: 'Active',
            onClick: () => {
                setActiveItemId('ACTIVE')
                onItemClick('ACTIVE')
            },
            icon: <RiCheckboxMultipleBlankLine/>
        },
        {
            id: 'COMPLETED',
            title: 'Completed',
            onClick: () => {
                setActiveItemId('COMPLETED')
                onItemClick('COMPLETED')
            },
            icon: <RiCheckboxMultipleLine/>

        },
    ]
    return (
        <div className='flex flex-col justify-between h-full '>
            <div>
                <p className={'font-bold mb-6 mt-1 text-2xl'}>Menu</p>
                <ul>
                    {menuItems.map((item, i) => {
                        const activeItemStyle = item.id === activeItemId ? 'text-amber-300' : 'text-black'
                        return (
                            <li key={i} onClick={item.onClick}
                                className={`flex flex-row cursor-pointer items-center mt-4 text-xl hover:text-amber-500 ${activeItemStyle}`}>
                                <>
                                    {item.icon}
                                    <p className={'ml-2'}>{item.title}</p>
                                </>
                            </li>
                        )
                    })}
                </ul>

            </div>
            <UserInfo/>
        </div>
    )
}