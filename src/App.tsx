import {useEffect, useState} from "react";
import {NewItemButton} from "./components/list/NewItemButton/NewItemButton.tsx";
import {IListItem, TActiveForm, TMenuItem} from "./types.ts";
import {ItemList} from "./components/list/ItemList/ItemList.tsx";
import {Menu} from "./components/Menu/Menu.tsx";
import {capitalizeFirstLetter, localStorageGetList, localStorageSetList} from "./utils.ts";
import {FormWrapper} from "./components/form/FormWrapper/FormWrapper.tsx";


function App() {
    const [activeForm, setActiveForm] = useState<TActiveForm>('NONE');
    const [list, setList] = useState<IListItem[]>([]);
    const [filteredBy, setFilteredBy] = useState<TMenuItem>('ALL');
    const [filteredList, setFilteredList] = useState<IListItem[]>([]);
    const [itemForEdit, setItemForEdit] = useState<IListItem | undefined>(undefined);

    const handleListUpdate = (newList: IListItem[]) => {
        setList(newList)
        localStorageSetList(newList);
    }

    const handleMenuItemClick = (menuItem: TMenuItem) => {
        setFilteredBy(menuItem);
        setActiveForm('NONE');
        setItemForEdit(undefined);
    }

    const handleNewItemClick = () => {
        setActiveForm('NEW')
        setItemForEdit(undefined)
    }

    const handleItemClick = (item: IListItem) => {
        setActiveForm('EDIT')
        setItemForEdit(item);
    }

    const handleSubmit = (item: IListItem) => {
        const newList = [...list];
        newList.push(item);

        handleListUpdate(newList);
    }

    const handleSubmitEdit = (item: IListItem) => {
        const newList = [...list];
        const editItemIndex = newList.findIndex((i) => i.id === item.id);
        newList.splice(editItemIndex, 1, item);

        setItemForEdit(item);
        handleListUpdate(newList);
    }

    const handleItemDelete = (item: IListItem) => {
        const newList = [...list];
        const deleteItemIndex = newList.findIndex((i) => i.id === item.id);
        newList.splice(deleteItemIndex, 1);

        const nextItemIndexForDelete = deleteItemIndex === newList.length ? newList.length - 1 : deleteItemIndex;
        if (!newList.length) {
            setActiveForm('NONE');
        }
        setItemForEdit(newList[nextItemIndexForDelete]);
        handleListUpdate(newList);
    }

    const handleItemCompleted = (item: IListItem) => {
        const newList = [...list];
        const completedItemIndex = newList.findIndex((i) => i.id === item.id);
        const updatedItem: IListItem = {
            ...item,
            status: 'COMPLETED'
        }
        setItemForEdit(updatedItem);
        newList.splice(completedItemIndex, 1, updatedItem);
        handleListUpdate(newList);
    }


    useEffect(() => {
        const list = localStorageGetList()
        if (list.length) {
            setList(list);
        }
    }, []);

    useEffect(() => {
        switch (filteredBy) {
            case "ACTIVE": {
                const f = list.filter((i) => i.status === "ACTIVE");
                setFilteredList(f);
                return;
            }
            case "COMPLETED": {
                const f = list.filter((i) => i.status === "COMPLETED");
                setFilteredList(f);
                return;
            }
            case 'ALL':
            default: {
                setFilteredList(list);
                return;
            }
        }
    }, [filteredBy, list]);

    const renderList = () => {
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

    return (
        <div className='flex flex-row justify-center items-center w-full h-dvh'>
            <div className='flex flex-row justify-center w-4/5 bg-slate-50 rounded-2xl overflow-hidden h-[95%] '>
                <div className={'w-1/6 p-6'}>
                    <Menu onItemClick={handleMenuItemClick}/>
                </div>
                <div className={'w-3/6 p-6 bg-white'}>
                    {renderList()}
                </div>
                <div className={'bg-slate-50 w-2/6 p-6'}>
                    <FormWrapper
                        itemForEdit={itemForEdit}
                        activeForm={activeForm}
                        handleSubmit={handleSubmit}
                        handleSubmitEdit={handleSubmitEdit}
                        handleItemDelete={handleItemDelete}
                        handleItemCompleted={handleItemCompleted}/>
                </div>
            </div>
        </div>
    )
}

export default App
