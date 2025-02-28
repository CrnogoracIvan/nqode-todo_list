import {useEffect, useState} from "react";
import {IListItem} from "../../types.ts";
import {Button} from "../foundation/Button/Button.tsx";
import {Input} from "../foundation/Input/Input.tsx";


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

    const dataForSubmit = {
        id,
        title,
        description,
        status: item.status,
    }

    useEffect(() => {
        if (!item) {
            return;
        }
        setId(item.id);
        setTitle(item.title);
        setDescription(item.description);
    }, [item]);


    return (
        <div className={'flex flex-1 flex-col border-1 w-full p-4'}>
            <Input label={'Title'} value={title} onChangeValue={setTitle}/>
            <Input label={'Description'} value={description} onChangeValue={setDescription}
                   rows={7}/>
            <div className="flex flex-1 flex-col items-end">
                <Button type={'SUBMIT'} onClick={() => onSubmitChanges(dataForSubmit)} label={'Save changes'}/>
                <Button type={'SUCCESS'} onClick={() => onConfirm(item)} label={'Mark as completed'}/>
                <Button type={'CANCEL'} onClick={() => onDelete(item)} label={'Delete task'}/>
            </div>
        </div>
    )
}