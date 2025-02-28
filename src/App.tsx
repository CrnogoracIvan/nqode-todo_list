
import { BiPlus, BiChevronRight } from "react-icons/bi";
import {useState} from "react";

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

   const renderNewItemClick = () => (
       <div className={'flex flex-row cursor-pointer items-center my-2 py-4 border-y hover:border-amber-300'} onClick={handleNewItemClick}>
           <BiPlus />
           <p className={'ml-1'}>
            Add new item
           </p>
       </div>
   )

    const renderItem = (itemName: string) => (
        <div className={'flex flex-row cursor-pointer items-center justify-between mt-4 py-2 border-b hover:border-amber-300'} onClick={()=> {console.log('clicked')}}>
            <p className={'ml-1'}>
                {itemName}
            </p>
            <BiChevronRight />
        </div>
    )

    const renderLeftSideTitle = () => (
        <h1 className='text-7xl font-bold mb-6'>Today</h1>
    )

    const renderAddNewItemForm = () => (
        <div className={'flex flex-1 border-2 w-full h-full'}>
           nja
        </div>

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
                    {renderNewItemClick()}
                    {renderItem('Ovo je Item 1')}
                    {renderItem('Ovo je Item 2')}
                    {renderItem('Ovo je Item 3')}
                    {renderItem('Ovo je Item 4')}
                </div>
                <div className={'bg-slate-100 w-1/2 border-1 rounded-lg'}>
                    {isNewItemFormVisible ? renderAddNewItemForm() : <p>right side</p>}
                </div>
            </div>
        </div>
    </>
  )
}

export default App
