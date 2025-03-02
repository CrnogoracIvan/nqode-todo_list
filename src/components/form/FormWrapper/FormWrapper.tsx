import {NewItemForm} from "../NewItemForm/NewItemForm.tsx";
import {EditItemForm} from "../EditItemForm/EditItemForm.tsx";
import {LuSquareMousePointer} from "react-icons/lu";
import {IDummyDataItem, IListItem, TActiveForm} from "../../../types.ts";

interface IProps {
    itemForEdit: IListItem | undefined;
    activeForm: TActiveForm
    handleSubmit: (item: IListItem) => void
    handleSubmitEdit: (item: IListItem) => void
    handleItemDelete: (item: IListItem) => void
    handleItemCompleted: (item: IListItem) => void
    dummyData: IDummyDataItem[]
}

export const FormWrapper = ({
                                itemForEdit,
                                activeForm,
                                handleSubmit,
                                handleSubmitEdit,
                                handleItemCompleted,
                                handleItemDelete,
                                dummyData,
                            }: IProps) => {
    const formTitle = itemForEdit ? `Task: ${itemForEdit.title}` : 'New Task:';
    const getForm = () => {
        switch (activeForm) {
            case "NEW":
                return (
                    <NewItemForm onSubmit={handleSubmit} dummyData={dummyData}/>
                )
            case "EDIT":
                if (!itemForEdit) {
                    return null
                }
                return (
                    <EditItemForm
                        item={itemForEdit}
                        onSubmitChanges={handleSubmitEdit}
                        onDelete={handleItemDelete}
                        onConfirm={handleItemCompleted}
                    />
                )
            case 'NONE':
            default:
                return (
                    <div className={'flex flex-col items-center mt-64 h-full'}>
                        <LuSquareMousePointer className={'text-8xl mb-4'}/>
                        <p>No task selected</p>
                    </div>

                )
        }
    }

    return (
        <>
            <p className={'font-bold mb-6 text-2xl'}>{formTitle}</p>
            {getForm()}
        </>
    );
}