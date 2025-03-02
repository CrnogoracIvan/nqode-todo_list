interface IProps {
    label: string;
    value: string;
    onChangeValue: (newValue: string) => void;
    rows?: number;
}

export const FoundationInput = ({label, value, onChangeValue, rows = 1}: IProps) => {
    const inputStyle = "w-full bg-transparent placeholder:text-slate-500 text-slate-700 text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:border-amber-300 focus:outline-none shadow-sm focus:shadow"
    const renderOneLineInputContent = () => (
        <input
            className={inputStyle}
            placeholder={`Add ${label} ...`}
            value={value}
            onChange={(e) => onChangeValue(e.target.value)}
        />
    )
    const renderMultipleLineInputContent = () => (
        <textarea
            className={inputStyle}
            placeholder={`Add ${label} ...`}
            value={value}
            rows={rows}
            onChange={(e) => onChangeValue(e.target.value)}
        />
    )
    
    return (
        <div className="w-full  min-w-[200px] py-2">
            {rows > 1 ? renderMultipleLineInputContent() : renderOneLineInputContent()}
        </div>
    )
}