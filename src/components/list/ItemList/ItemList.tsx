import {IListItem} from "../../../types.ts";
import {Item} from "../Item/Item.tsx";
import {useEffect, useState} from "react";
import {GoSortAsc, GoSortDesc} from "react-icons/go";
import {LuListTodo} from "react-icons/lu";

type TSortBy = 'task' | 'date'
type TSortOrder = 'asc' | 'desc'

interface IHeaderItem {
    label: string;
    value: TSortBy;
    width: string
}

interface IProps {
    items: IListItem[]
    onItemClick: (item: IListItem) => void;
    selectedItem: IListItem | undefined;
}

export const ItemList = ({items, onItemClick, selectedItem}: IProps) => {

    const [listItems, setListItems] = useState<IListItem[]>([]);
    const [sortBy, setSortBy] = useState<TSortBy>('task');
    const [sortOrder, setSortOrder] = useState<TSortOrder>('asc');

    const headerItems: IHeaderItem[] = [
        {label: 'Task Name', value: 'task', width: 'w-[70%]'},
        {label: 'Date', value: 'date', width: 'w-[30%]'},
    ]

    const handleSort = (newSortBy: TSortBy) => {
        if (sortBy === newSortBy) {
            setSortOrder(prevState => prevState === 'asc' ? 'desc' : 'asc')
        } else {
            setSortOrder('asc');
            setSortBy(newSortBy);
        }
    }


    useEffect(() => {
        let sortedItemList
        if (sortBy === 'task') {
            sortedItemList = items.sort((a, b) => sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
        } else {
            sortedItemList = items.sort((a, b) => sortOrder === 'asc' ? new Date(b.dueDate).toISOString().localeCompare(new Date(a.dueDate).toISOString()) : new Date(a.dueDate).toISOString().localeCompare(new Date(b.dueDate).toISOString()));
        }
        setListItems(sortedItemList);
    }, [items, sortBy, sortOrder]);


    const renderSortIcon = (item: IHeaderItem) => {
        if (item.value !== sortBy) {
            return null
        }
        if (sortOrder === 'asc') {
            return (
                <GoSortAsc className={'text-xl font-bold'}/>
            )
        } else {
            return (
                <GoSortDesc className={'text-xl font-bold'}/>
            )
        }
    }

    const renderHeader = () => (
        <div className={'flex flex-row border-b w-full py-2 border-b-2'}>
            {headerItems.map((item, i) => (
                <div key={`${item.label}-${i}`}
                     className={`${item.width} cursor-pointer font-bold flex flex-row items-center`}
                     onClick={() => handleSort(item.value)}>
                    <p className={'mr-1'}>{item.label}</p>
                    {renderSortIcon(item)}
                </div>

            ))}
        </div>
    )


    const renderList = () => (
        <ul className={'overflow-y-auto list-none'}>
            {listItems.map((item, index) => (
                <li key={`${index}-${item.id}`}>
                    <Item item={item} onClick={onItemClick} selectedItemId={selectedItem?.id}/>
                </li>
            ))}
        </ul>
    )

    const renderEmptyList = () => {
        return (
            <div className={'flex flex-col items-center justify-center h-full'}>
                <LuListTodo className={'text-8xl mb-4'}/>
                <p>The list is empty</p>
            </div>
        )
    }

    if (listItems.length === 0) {
        return renderEmptyList()
    }

    return (
        <>
            {renderHeader()}
            <div className="overflow-y-auto max-h-dvh">
                {renderList()}
            </div>
        </>
    );

}