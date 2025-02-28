import {useEffect, useState} from "react";
import {NewItemButton} from "./components/NewItemButton/NewItemButton.tsx";
import {NewItemForm} from "./components/NewItemForm/NewItemForm.tsx";
import {IListItem, TMenuItem} from "./types.ts";
import {ItemList} from "./components/ItemList/ItemList.tsx";
import {EditItemForm} from "./components/EditItemForm/EditItemForm.tsx";
import {Menu} from "./components/Menu/Menu.tsx";
import {capitalizeFirstLetter} from "./utils.ts";


type TActiveForm = 'NONE' | 'NEW' | 'EDIT'

function App() {
    const [activeForm, setActiveForm] = useState<TActiveForm>('NONE');
    const [list, setList] = useState<IListItem[]>([]);
    const [filteredBy, setFilteredBy] = useState<TMenuItem>('ALL');
    const [filteredList, setFilteredList] = useState<IListItem[]>([]);
    const [itemForEdit, setItemForEdit] = useState<IListItem | undefined>(undefined);

    const handleMenuItemClick = (menuItem: TMenuItem) => {
        setFilteredBy(menuItem);
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

        setList(newList);
    }

    const handleSubmitEdit = (item: IListItem) => {
        const newList = [...list];
        const editItemIndex = newList.findIndex((i) => i.id === item.id);
        newList.splice(editItemIndex, 1, item);

        setList(newList);
    }

    const handleItemDelete = (item: IListItem) => {
        const newList = [...list];
        const deleteItemIndex = newList.findIndex((i) => i.id === item.id);
        newList.splice(deleteItemIndex, 1);

        setList(newList);
        const nextItemIndexForDelete = deleteItemIndex === newList.length ? newList.length - 1 : deleteItemIndex;
        if (!newList.length) {
            setActiveForm('NONE');
        }
        setItemForEdit(newList[nextItemIndexForDelete]);
    }

    const handleItemCompleted = (item: IListItem) => {
        const newList = [...list];
        const completedItemIndex = newList.findIndex((i) => i.id === item.id);
        const updatedItem: IListItem = {
            ...item,
            status: 'COMPLETED'
        }
        newList.splice(completedItemIndex, 1, updatedItem);
        setList(newList);
    }

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
        return (
            <>
                <h1 className='text-5xl font-bold mb-6'>{title}</h1>
                <NewItemButton onClick={handleNewItemClick}/>
                <ItemList onItemClick={handleItemClick} items={filteredList} selectedItem={itemForEdit}/>
            </>
        )
    }

    const renderForm = () => {
        const getForm = () => {
            switch (activeForm) {
                case "NEW":
                    return (
                        <NewItemForm onSubmit={handleSubmit}/>
                    )
                case "EDIT":
                    if (!itemForEdit) {
                        return null
                    }
                    return (
                        <EditItemForm
                            item={itemForEdit}
                            onSubmitChanges={handleSubmitEdit}
                            onDelete={handleItemDelete}
                            onConfirm={handleItemCompleted}
                        />
                    )
                case 'NONE':
                default:
                    return (
                        <p>No item selected</p>
                    )
            }
        }

        return (
            <>
                <p className={'font-bold mb-6 text-4xl'}>Task:</p>
                {getForm()}
            </>
        );
    }

    const renderMenu = () => {
        return (
            <>
                <p className={'font-bold mb-6 text-4xl'}>Menu</p>
                <Menu onItemClick={handleMenuItemClick}/>
            </>
        )

    }

    return (
        <div className='flex flex-row justify-center items-center w-full h-dvh border-2'>
            <div className='flex flex-row justify-center w-4/5 bg-slate-50 rounded-2xl overflow-hidden h-[95%] '>
                <div className={'w-1/5 p-6'}>
                    {renderMenu()}
                </div>
                <div className={'w-2/5 p-6 bg-white'}>
                    {renderList()}
                </div>
                <div className={'bg-slate-50 w-2/5 p-6'}>
                    {renderForm()}
                </div>
            </div>
        </div>
    )
}

export default App
