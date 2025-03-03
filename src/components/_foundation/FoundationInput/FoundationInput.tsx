interface IProps {
    label: string;
    value: string;
    onChangeValue: (newValue: string) => void;
    rows?: number;
    type?: 'text' | 'password';
    error?: boolean;
}

export const FoundationInput = ({label, value, onChangeValue, rows = 1, type = 'text', error = false}: IProps) => {
    const inputStyle = "w-full bg-transparent placeholder:text-slate-500 text-slate-700 text-sm border rounded-md px-3 py-2 transition duration-300 ease focus:border-amber-300 focus:outline-none shadow-sm focus:shadow"
    const borderStyle = `${error ? 'border-red-600' : 'border-slate-400'}`
    const renderOneLineInputContent = () => (
        <input
            type={type}
            className={`${inputStyle} ${borderStyle}`}
            placeholder={`Enter ${label} ...`}
            value={value}
            onChange={(e) => onChangeValue(e.target.value)}
        />
    )
    const renderMultipleLineInputContent = () => (
        <textarea
            className={inputStyle}
            placeholder={`Enter ${label} ...`}
            value={value}
            rows={rows}
            onChange={(e) => onChangeValue(e.target.value)}
        />
    )

    return (
        <div className="w-full min-w-[200px] py-2">
            {rows > 1 ? renderMultipleLineInputContent() : renderOneLineInputContent()}
        </div>
    )
}

