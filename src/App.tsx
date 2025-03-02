import {useEffect, useState} from "react";
import {IListItem, TActiveForm, TMenuItem} from "./types.ts";
import {Menu} from "./components/Menu/Menu.tsx";
import {localStorageGetList, localStorageSetList} from "./utils.ts";
import {FormWrapper} from "./components/form/FormWrapper/FormWrapper.tsx";
import {ListWrapper} from "./components/list/ListWrapper/ListWrapper.tsx";
import {getCoffeeService} from "./services/coffee.service.ts";

function App() {
    const [activeForm, setActiveForm] = useState<TActiveForm>('NONE');
    const [list, setList] = useState<IListItem[]>([]);
    const [filteredBy, setFilteredBy] = useState<TMenuItem>('ALL');
    const [filteredList, setFilteredList] = useState<IListItem[]>([]);
    const [itemForEdit, setItemForEdit] = useState<IListItem | undefined>(undefined);
    const [coffee, setCoffee] = useState([]);


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

    const handleItemSubmit = (item: IListItem) => {
        const newList = [...list];
        newList.push(item);

        handleListUpdate(newList);
    }

    const handleItemEdit = (item: IListItem) => {
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
        const getCoffee = async () => {
            try {
                const data = await getCoffeeService();
                if (data) {
                    setCoffee(data);
                }
            } catch (e) {
                console.error(e);
            }
        }
        getCoffee();
    }, []);


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

    useEffect(() => {
        if (!filteredList.length) {
            setActiveForm('NONE');
        }
    }, [filteredList.length]);

    return (
        <div className='flex flex-row justify-center items-center w-full h-dvh'>
            <div className='flex flex-row justify-center w-4/5 bg-slate-50 rounded-2xl overflow-hidden h-[95%] '>
                <div className={'w-1/6 p-6'}>
                    <Menu onItemClick={handleMenuItemClick}/>
                </div>
                <div className={'w-3/6 p-6 bg-white'}>
                    <ListWrapper
                        filteredList={filteredList}
                        filteredBy={filteredBy}
                        handleNewItemClick={handleNewItemClick}
                        handleItemClick={handleItemClick}
                        itemForEdit={itemForEdit}
                    />
                </div>
                <div className={'bg-slate-50 w-2/6 p-6'}>
                    <FormWrapper
                        itemForEdit={itemForEdit}
                        activeForm={activeForm}
                        handleSubmit={handleItemSubmit}
                        handleSubmitEdit={handleItemEdit}
                        handleItemDelete={handleItemDelete}
                        handleItemCompleted={handleItemCompleted}
                        dummyData={coffee}
                    />
                </div>
            </div>
        </div>
    )
}

export default App
