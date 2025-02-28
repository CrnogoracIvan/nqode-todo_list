interface IProps {
    type: 'SUBMIT' | 'CANCEL' | 'DELETE' | 'SUCCESS';
    label: string;
    disabled?: boolean;
    onClick: () => void;
}

export const Button = ({label, type, disabled = false, onClick}: IProps) => {
    const globalStyle = 'w-48 rounded-md py-2 px-4 my-1 border border-transparent text-center text-sm text-white transition-all shadow-md active:shadow-none hover:shadow-lg'
    const disabledStyle = 'disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
    const submitStyle = ' bg-amber-300 hover:bg-amber-500'
    const deleteStyle = ' bg-red-500 hover:bg-red-700'
    const sucessStyle = ' bg-green-500 hover:bg-green-700'

    const getStyleByType = () => {
        switch (type) {
            case 'CANCEL':
                return deleteStyle;
            case "SUCCESS":
                return sucessStyle;
            case 'SUBMIT':
            default:
                return submitStyle;
        }
    }

    return (
        <button
            className={`${globalStyle} ${disabledStyle} ${getStyleByType()}`}
            type="button"
            disabled={disabled}
            onClick={onClick}
        >
            {label}
        </button>
    )

}