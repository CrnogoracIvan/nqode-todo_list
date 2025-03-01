import {useEffect, useState} from "react";
import {IListItem} from "../../../types.ts";
import {FoundationButton} from "../../foundation/FoundationButton/FoundationButton.tsx";
import {FoundationInput} from "../../foundation/FoundationInput/FoundationInput.tsx";
import {FoundationDatePicker} from "../../foundation/FoundationDatePicker/FoundationDatePicker.tsx";


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
    const [dueDate, setDueDate] = useState<Date>(new Date());


    const dataForSubmit = {
        id,
        title,
        description,
        dueDate,
        status: item.status,
    }

    useEffect(() => {
        if (!item) {
            return;
        }
        setId(item.id);
        setTitle(item.title);
        setDescription(item.description);
        setDueDate(item.dueDate)
    }, [item]);


    const renderCompletedButton = () => {
        if (item.status === 'COMPLETED') {
            return null
        }
        return (
            <div className={'flex flex-row w-full justify-end'}>
                <FoundationButton type={'SUCCESS'} onClick={() => onConfirm(item)} label={'Mark as completed'}/>
            </div>
        )
    }

    return (
        <div className={'flex flex-1 flex-col w-full'}>
            {renderCompletedButton()}
            <FoundationInput label={'Title'} value={title} onChangeValue={setTitle}/>
            <FoundationInput label={'Description'} value={description} onChangeValue={setDescription}
                             rows={7}/>
            <FoundationDatePicker defaultValue={item.dueDate} onChange={setDueDate}/>

            <div className="flex flex-1 flex-row justify-center">
                <FoundationButton customClass={'mr-2'} type={'CANCEL'} onClick={() => onDelete(item)}
                                  label={'Delete task'}/>
                <FoundationButton customClass={'ml-2'} type={'SUBMIT'} onClick={() => onSubmitChanges(dataForSubmit)}
                                  label={'Save changes'}/>
            </div>
        </div>
    )
}