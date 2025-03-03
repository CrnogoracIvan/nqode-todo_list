interface IProps {
    type: 'SUBMIT' | 'CANCEL' | 'DELETE' | 'SUCCESS';
    label: string;
    disabled?: boolean;
    onClick: () => void;
    customClass?: string;
}

export const FoundationButton = ({label, type, disabled = false, onClick, customClass}: IProps) => {
    const globalStyle = 'w-48 rounded-md py-2 px-4 my-1 border border-transparent text-center text-sm transition-all shadow-md active:shadow-none hover:shadow-lg'
    const disabledStyle = 'disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
    const submitStyle = ' bg-amber-300 hover:font-bold'
    const deleteStyle = ' border-red-500 hover:bg-red-500 text-red-500 hover:text-white font-bold'
    const successStyle = ' border-green-500 hover:bg-green-500 text-green-500 hover:text-white font-bold'

    const getStyleByType = () => {
        switch (type) {
            case 'CANCEL':
                return deleteStyle;
            case "SUCCESS":
                return successStyle;
            case 'SUBMIT':
            default:
                return submitStyle;
        }
    }

    return (
        <button
            className={`${globalStyle} ${disabledStyle} ${getStyleByType()} ${customClass}`}
            type="button"
            disabled={disabled}
            onClick={onClick}
        >
            {label}
        </button>
    )

}