import {useState} from "react";
import {IListItem} from "../../../types.ts";
import {v4 as uuidv4} from 'uuid';
import {Button} from "../../foundation/Button/Button.tsx";
import {Input} from "../../foundation/Input/Input.tsx";
import {FoundationDatePicker} from "../../foundation/FoundationDatePicker/FoundationDatePicker.tsx";


interface IProps {
    onSubmit: (item: IListItem) => void;
}


export const NewItemForm = ({onSubmit}: IProps) => {

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [dueDate, setDueDate] = useState<Date>(new Date());

    const disableSubmit = title.length === 0 || description.length === 0;

    const resetForm = () => {
        setTitle('');
        setDescription('');
    }

    const handleSubmit = () => {
        const id = uuidv4();
        onSubmit({
            id,
            title,
            description,
            dueDate,
            status: 'ACTIVE'
        })
        resetForm()
    }

    return (
        <div className={'flex flex-1 flex-col border-1 w-full p-4'}>
            <Input label={'Title'} value={title} onChangeValue={setTitle}/>
            <Input label={'Description'} value={description} onChangeValue={setDescription}
                   rows={7}/>
            <div className="flex flex-1 flex-col justify-end">
                <FoundationDatePicker onChange={setDueDate}/>
                <Button customClass={'mt-4'} type={'SUBMIT'} onClick={handleSubmit} disabled={disableSubmit}
                        label={'Save task'}/>
            </div>
        </div>
    )
}