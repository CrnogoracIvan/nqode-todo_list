import {useState} from "react";
import {NewItemButton} from "./components/NewItemButton/NewItemButton.tsx";
import {NewItemForm} from "./components/NewItemForm/NewItemForm.tsx";
import {IListItem} from "./types.ts";
import {ItemList} from "./components/ItemList/ItemList.tsx";

function App() {

    const [isNewItemFormVisible, setIsNewItemFormVisible] = useState<boolean>(false);
    const [list, setList] = useState<IListItem[]>([]);

    const handleNewItemClick = () => {
        setIsNewItemFormVisible(true);
    }

    const handleSubmit = (item: IListItem) => {
        const newList = [...list];
        newList.push(item);
        setList(newList);
    }

    const renderLeftSideTitle = () => (
        <h1 className='text-7xl font-bold mb-6'>Today</h1>
    )

    return (
        <>
            <p className='text-3xl font-bold text-blue-600'>
                NQcode To Do List
            </p>
            <div className='flex flex-row justify-center w-full'>
                <div className='flex flex-row justify-center w-1/2'>
                    <div className={'w-1/2 pr-4'}>
                        {renderLeftSideTitle()}
                        <NewItemButton onClick={handleNewItemClick}/>
                        <ItemList items={list}/>
                    </div>
                    <div className={'bg-slate-50 w-1/2 border-1 rounded-lg'}>
                        {isNewItemFormVisible ? <NewItemForm onSubmit={handleSubmit}/> : <p>right side</p>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
