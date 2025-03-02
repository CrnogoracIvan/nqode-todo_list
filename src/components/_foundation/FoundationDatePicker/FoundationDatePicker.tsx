import {DatePicker} from "@mui/x-date-pickers";
import {useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";

interface IProps {
    onChange: (date: Date) => void;
    value?: Date;
}

export const FoundationDatePicker = ({onChange, value}: IProps) => {
    const [localValue, setLocalValue] = useState<Dayjs>(dayjs(new Date()));

    const handleChange = (newValue: Dayjs) => {
        setLocalValue(dayjs(newValue));
        onChange(newValue.toDate());
    }

    useEffect(() => {
        setLocalValue(dayjs(value));
    }, [value])


    return (
        <DatePicker
            label="Due date"
            value={dayjs(localValue)}
            onChange={(newValue) => newValue && handleChange(newValue)}
            sx={{
                "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                        borderColor: "rgb(252, 211, 77) !important", // Amber 300 on focus
                    },
                    "& fieldset": {
                        borderColor: "rgb(156, 163, 175) !important",
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                    },
                },
                "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                        color: "rgb(252, 211, 77) !important", // Amber 300 when focused
                    },
                },
                // 🎨 Stronger Selector for Selected Date Color
                "& .MuiDayPicker-day.Mui-selected": {
                    backgroundColor: "rgb(252, 211, 77) !important", // Amber 300 background
                    color: "rgb(30, 41, 59) !important", // Dark text (slate-800)
                    "&:hover": {
                        backgroundColor: "rgb(252, 211, 77) !important", // Keep Amber on hover
                        opacity: 0.9,
                    },
                },
            }}
        />
    )
}