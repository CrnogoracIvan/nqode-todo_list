import {useCallback, useEffect, useState} from "react";
import {IDummyDataItem, IListItem} from "../../../types.ts";
import {v4 as uuidv4} from 'uuid';
import {FoundationButton} from "../../_foundation/FoundationButton/FoundationButton.tsx";
import {FoundationInput} from "../../_foundation/FoundationInput/FoundationInput.tsx";
import {FoundationDatePicker} from "../../_foundation/FoundationDatePicker/FoundationDatePicker.tsx";
import {getRandomNumber} from "../../../utils.ts";
import {useAuth} from "../../../hooks/useAuth.ts";

interface IProps {
    onSubmit: (item: IListItem) => void;
    dummyData: IDummyDataItem[];
}

export const NewItemForm = ({onSubmit, dummyData}: IProps) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [dueDate, setDueDate] = useState<Date>(new Date());
    const {loggedUser} = useAuth()

    const disableSubmit = title.length === 0 || description.length === 0;

    const prepareNewDescription = useCallback(() => {
        const oneCoffeeForDescriptionIndex = dummyData?.length && getRandomNumber(dummyData.length);
        const oneCoffee = dummyData[oneCoffeeForDescriptionIndex]
        const coffeeDescription = `${oneCoffee?.title} - ${oneCoffee?.description}`;
        setDescription(coffeeDescription);
    }, [dummyData])

    const resetForm = () => {
        setTitle('');
        prepareNewDescription();
    }

    const handleSubmit = () => {
        const id = uuidv4();
        onSubmit({
            userId: loggedUser?.id || '',
            id,
            title,
            description,
            dueDate,
            status: 'ACTIVE'
        })
        resetForm()
    }


    useEffect(() => {
        prepareNewDescription();
    }, [dummyData, prepareNewDescription]);

    return (
        <div className={'flex flex-1 flex-col border-1 w-full p-4'}>
            <FoundationInput label={'Title'} value={title} onChangeValue={setTitle}/>
            <FoundationInput label={'Description'} value={description} onChangeValue={setDescription}
                             rows={7}/>
            <div className="flex flex-1 flex-col justify-end">
                <FoundationDatePicker onChange={setDueDate}/>
                <FoundationButton customClass={'mt-4'} type={'SUBMIT'} onClick={handleSubmit} disabled={disableSubmit}
                                  label={'Save task'}/>
            </div>
        </div>
    )
}