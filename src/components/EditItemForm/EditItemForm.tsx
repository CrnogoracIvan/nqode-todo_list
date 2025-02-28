import {useEffect, useState} from "react";
import {IListItem} from "../../types.ts";


interface IProps {
    item: IListItem;
    onSubmitChanges: (item: IListItem) => void;
    onDelete: (item: IListItem) => void;
    onConfirm: (item: IListItem) => void;
}


export const EditItemForm = ({item, onSubmitChanges, onDelete, onConfirm}: IProps) => {
    const [id, setId] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        if (!item) {
            return;
        }
        setId(item.id);
        setTitle(item.title);
        setDescription(item.description);
    }, [item]);

    const disableSubmit = title?.length === 0 || description.length === 0;

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

    const renderConfirmChangesButton = () => (
        <button
            className="mt-2 rounded-md bg-amber-300 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-amber-500 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-48"
            type="button"
            disabled={disableSubmit}
            onClick={() => onSubmitChanges({
                id,
                title,
                description,
                status: item.status,
            })}
        >
            Save changes
        </button>
    )

    const renderDeleteItemButton = () => {
        if (!item) {
            return null;
        }
        return (
            <button
                className="mt-2 rounded-md bg-red-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-red-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-48"
                type="button"
                disabled={disableSubmit}
                onClick={() => onDelete(item)}
            >
                Delete item
            </button>
        )
    }

    const renderMarkCompletedButton = () => {
        if (!item) {
            return null;
        }
        return (
            <button
                className="mt-2 rounded-md bg-green-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-48"
                type="button"
                disabled={disableSubmit}
                onClick={() => onConfirm(item)}
            >
                Mark as completed
            </button>
        )
    }

    return (
        <div className={'flex flex-1 flex-col border-1 w-full p-4'}>
            {renderInput('Title', title, setTitle)}
            {renderInput('Description', description, setDescription)}
            <div className="flex flex-1 flex-col items-end">
                {renderConfirmChangesButton()}
                {renderMarkCompletedButton()}
                {renderDeleteItemButton()}
            </div>
        </div>
    )
}