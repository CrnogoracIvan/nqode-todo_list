
import {useState} from "react";
import {NewItemButton} from "./components/NewItemButton/NewItemButton.tsx";
import {Item} from "./components/Item/Item.tsx";
import {NewItemForm} from "./components/NewItemForm/NewItemForm.tsx";

// interface IItem {
//     id: string;
//     title: string;
//     description: string;
//     dueDate: string;
// }

function App() {

    const [isNewItemFormVisible, setIsNewItemFormVisible] = useState<boolean>(false);

    const handleNewItemClick = () => {
        setIsNewItemFormVisible(true);
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
                    <NewItemButton onClick={handleNewItemClick} />
                    <Item itemName={'item1'}/>
                </div>
                <div className={'bg-slate-100 w-1/2 border-1 rounded-lg'}>
                    {isNewItemFormVisible ? <NewItemForm/> : <p>right side</p>}
                </div>
            </div>
        </div>
    </>
  )
}

export default App
