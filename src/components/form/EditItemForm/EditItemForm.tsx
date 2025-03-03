import {useEffect, useState} from "react";
import {IListItem} from "../../../types.ts";
import {FoundationButton} from "../../_foundation/FoundationButton/FoundationButton.tsx";
import {FoundationInput} from "../../_foundation/FoundationInput/FoundationInput.tsx";
import {FoundationDatePicker} from "../../_foundation/FoundationDatePicker/FoundationDatePicker.tsx";
import {IoMdCheckmarkCircleOutline} from "react-icons/io";

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
        userId: item.userId,
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
            return (
                <div className={'flex flex-row text-green-500 justify-end items-center font-bold h-12'}>
                    <p className={'pr-2'}>The task has been completed</p>
                    <IoMdCheckmarkCircleOutline className="text-xl"/>
                </div>
            )
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
            <FoundationInput label={'Description'} value={description} onChangeValue={setDescription} rows={7}/>
            <FoundationDatePicker value={item.dueDate} onChange={setDueDate}/>
            <div className="flex flex-1 flex-row justify-center mt-4">
                <FoundationButton customClass={'mr-2'} type={'CANCEL'} onClick={() => onDelete(item)}
                                  label={'Delete task'}/>
                <FoundationButton customClass={'ml-2'} type={'SUBMIT'} onClick={() => onSubmitChanges(dataForSubmit)}
                                  label={'Save changes'}/>
            </div>
        </div>
    )
}