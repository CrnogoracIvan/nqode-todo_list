import {Menu} from "../menu/Menu/Menu.tsx";
import {ListWrapper} from "../list/ListWrapper/ListWrapper.tsx";
import {FormWrapper} from "../form/FormWrapper/FormWrapper.tsx";
import {useEffect, useState} from "react";
import {IListItem, TActiveForm, TMenuItem} from "../../types.ts";
import {localStorageGetList, localStorageSetList} from "../../utils.ts";
import {getCoffeeService} from "../../services/coffee.service.ts";
import {useAuth} from "../../hooks/useAuth.ts";


export const Home = () => {
    const [activeForm, setActiveForm] = useState<TActiveForm>('NONE');
    const [list, setList] = useState<IListItem[]>([]);
    const [filteredBy, setFilteredBy] = useState<TMenuItem>('ALL');
    const [filteredList, setFilteredList] = useState<IListItem[]>([]);
    const [taskForEdit, setTaskForEdit] = useState<IListItem | undefined>(undefined);
    const [coffee, setCoffee] = useState([]);
    const {loggedUser} = useAuth()

    const handleListUpdate = (newList: IListItem[]) => {
        setList(newList)
        localStorageSetList(newList);
    }

    const handleMenuItemClick = (menuItem: TMenuItem) => {
        setFilteredBy(menuItem);
        setActiveForm('NONE');
        setTaskForEdit(undefined);
    }

    const handleNewTaskClick = () => {
        setActiveForm('NEW')
        setTaskForEdit(undefined)
    }

    const handleTaskClick = (item: IListItem) => {
        setActiveForm('EDIT')
        setTaskForEdit(item);
    }

    const handleNewTaskSubmit = (item: IListItem) => {
        const newList = [...list];
        newList.push(item);

        handleListUpdate(newList);
    }

    const handleTaskEdit = (item: IListItem) => {
        const newList = [...list];
        const editTaskIndex = newList.findIndex((i) => i.id === item.id);
        newList.splice(editTaskIndex, 1, item);

        setTaskForEdit(item);
        handleListUpdate(newList);
    }

    const handleTaskDelete = (item: IListItem) => {
        const newList = [...list];
        const deleteTaskIndex = newList.findIndex((i) => i.id === item.id);
        newList.splice(deleteTaskIndex, 1);

        const nextTaskIndexForDelete = deleteTaskIndex === newList.length ? newList.length - 1 : deleteTaskIndex;

        setTaskForEdit(newList[nextTaskIndexForDelete]);
        handleListUpdate(newList);
    }

    const handleItemCompleted = (item: IListItem) => {
        const newList = [...list];
        const completedItemIndex = newList.findIndex((i) => i.id === item.id);
        const updatedItem: IListItem = {
            ...item,
            status: 'COMPLETED'
        }
        setTaskForEdit(updatedItem);
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
        const list: IListItem[] = localStorageGetList()
        if (list.length) {
            const filteredListByUserId = list.filter((i) => i.userId === loggedUser?.id)
            setList(filteredListByUserId);
        }
    }, [loggedUser?.id]);

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
        <div
            className='flex flex-row justify-center w-4/5 bg-slate-50 rounded-2xl overflow-hidden h-[95%] shadow-md max-w-[86rem]'>
            <div className={'w-1/6 p-6'}>
                <Menu onItemClick={handleMenuItemClick}/>
            </div>
            <div className={'w-3/6 p-6 bg-white'}>
                <ListWrapper
                    filteredList={filteredList}
                    filteredBy={filteredBy}
                    handleNewItemClick={handleNewTaskClick}
                    handleItemClick={handleTaskClick}
                    itemForEdit={taskForEdit}
                />
            </div>
            <div className={'bg-slate-50 w-2/6 p-6'}>
                <FormWrapper
                    itemForEdit={taskForEdit}
                    activeForm={activeForm}
                    handleSubmit={handleNewTaskSubmit}
                    handleSubmitEdit={handleTaskEdit}
                    handleItemDelete={handleTaskDelete}
                    handleItemCompleted={handleItemCompleted}
                    dummyData={coffee}
                />
            </div>
        </div>
    )
}