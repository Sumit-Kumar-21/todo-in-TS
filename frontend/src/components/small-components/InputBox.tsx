import { ChangeEvent } from "react";

interface InputBoxProp {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>)=>void;
    type: string;
}

function InputBox({ label, placeholder, onChange, type }: InputBoxProp) {
    return <div className="flex flex-col gap-2">
        <label htmlFor={label.split(' ')[0]} className="text-sm font-bold text-black">{label}</label>
        <input type={type} id={label.split(' ')[0]} onChange={onChange} placeholder={placeholder} className="border-gray-200 border-2 h-10 w-full rounded-md pl-2"/>
    </div>;
}

export default InputBox;