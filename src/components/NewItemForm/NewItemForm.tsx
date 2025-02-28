import {useState} from "react";
import {IListItem} from "../../types.ts";


interface IProps {
    onSubmit: (item: IListItem) => void;
}


export const NewItemForm = ({onSubmit}: IProps) => {

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const disableSubmit = title.length === 0 || description.length === 0;

    const renderInput = (title: string, value: string, onChangeValue: (newValue: string) => void) => (
        <div className="w-full  min-w-[200px] py-2">
            <input
                className="w-full bg-transparent placeholder:text-slate-500 text-slate-700 text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:border-amber-300 focus:outline-none shadow-sm focus:shadow"
                placeholder={`Add ${title} ...`}
                value={value}
                onChange={(e) => onChangeValue(e.target.value)}
            />
        </div>
    )

    const renderConfirmButton = () => (
        <button
            className="rounded-md bg-amber-300 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-amber-500 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-48"
            type="button"
            disabled={disableSubmit}
            onClick={() => onSubmit({
                title,
                description,
            })}
        >
            Save item
        </button>
    )

    return (
        <div className={'flex flex-1 flex-col border-1 w-full p-4'}>
            {renderInput('Title', title, setTitle)}
            {renderInput('Description', description, setDescription)}
            <div className="flex flex-1 justify-end">
                {renderConfirmButton()}
            </div>
        </div>
    )
}