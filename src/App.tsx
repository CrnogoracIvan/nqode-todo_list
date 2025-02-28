import {useEffect, useState} from "react";
import {NewItemButton} from "./components/NewItemButton/NewItemButton.tsx";
import {NewItemForm} from "./components/NewItemForm/NewItemForm.tsx";
import {IListItem} from "./types.ts";
import {ItemList} from "./components/ItemList/ItemList.tsx";
import {EditItemForm} from "./components/EditItemForm/EditItemForm.tsx";

type TActiveForm = 'NONE' | 'NEW' | 'EDIT'

function App() {
    const [activeForm, setActiveForm] = useState<TActiveForm>('NONE');
    const [list, setList] = useState<IListItem[]>([]);
    const [itemForEdit, setItemForEdit] = useState<IListItem | null>(null);

    const handleNewItemClick = () => {
        setActiveForm('NEW')
        setItemForEdit(null)
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
        console.log('list je: ', list)
    }, [list])

    const renderLeftSideTitle = () => (
        <h1 className='text-7xl font-bold mb-6'>Today</h1>
    )

    const renderForm = () => {
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
            <p className='text-3xl font-bold text-blue-600'>
                nQode To Do List
            </p>
            <div className='flex flex-row justify-center w-full'>
                <div className='flex flex-row justify-center w-1/2'>
                    <div className={'w-1/2 pr-4'}>
                        {renderLeftSideTitle()}
                        <NewItemButton onClick={handleNewItemClick}/>
                        <ItemList onItemClick={handleItemClick} items={list} selectedItem={itemForEdit}/>
                    </div>
                    <div className={'bg-slate-50 w-1/2 border-1 rounded-lg'}>
                        {renderForm()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
