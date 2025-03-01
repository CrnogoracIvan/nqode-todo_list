import {capitalizeFirstLetter} from "../../../utils.ts";
import {NewItemButton} from "../NewItemButton/NewItemButton.tsx";
import {ItemList} from "../ItemList/ItemList.tsx";
import {IListItem, TMenuItem} from "../../../types.ts";

interface IProps {
    filteredList: IListItem[]
    filteredBy: TMenuItem
    handleItemClick: (item: IListItem) => void
    handleNewItemClick: () => void
    itemForEdit: IListItem | undefined
}

export const ListWrapper = ({filteredList, handleItemClick, handleNewItemClick, itemForEdit, filteredBy}: IProps) => {
    const numberOfTasks = filteredList.length > 0 ? ` - ${filteredList.length}` : '';
    const title = `${capitalizeFirstLetter(filteredBy)} tasks ${numberOfTasks}`;
    const addNewItemDisabled = filteredBy === 'COMPLETED';
    return (
        <>
            <h1 className='text-4xl font-bold mb-6'>{title}</h1>
            <NewItemButton disabled={addNewItemDisabled} onClick={handleNewItemClick}/>
            <ItemList onItemClick={handleItemClick} items={filteredList} selectedItem={itemForEdit}/>
        </>
    )
}