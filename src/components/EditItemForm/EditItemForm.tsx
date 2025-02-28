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


    const renderCompletedButton = () => {
        if (item.status === 'COMPLETED') {
            return null
        }
        return (
            <div className={'flex flex-row w-full justify-end'}>
                <Button type={'SUCCESS'} onClick={() => onConfirm(item)} label={'Mark as completed'}/>
            </div>
        )
    }

    return (
        <div className={'flex flex-1 flex-col w-full'}>
            {renderCompletedButton()}
            <Input label={'Title'} value={title} onChangeValue={setTitle}/>
            <Input label={'Description'} value={description} onChangeValue={setDescription}
                   rows={7}/>
            <div className="flex flex-1 flex-row justify-center">
                <Button customClass={'mr-2'} type={'CANCEL'} onClick={() => onDelete(item)} label={'Delete task'}/>
                <Button customClass={'ml-2'} type={'SUBMIT'} onClick={() => onSubmitChanges(dataForSubmit)}
                        label={'Save changes'}/>
            </div>
        </div>
    )
}