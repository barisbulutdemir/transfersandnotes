import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
    title: string;
    value: string;
    options: { value: string, label: string }[]; 
    onChange: (selectedValue: string) => void;

}

export default function NewPostTypeSelect({ title, value, options, onChange }: Props) {
    return (
        <div className='mt-2'>
            <Select onValueChange={onChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={title} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {options.map(option => ( // Seçenekleri map fonksiyonu ile işliyoruz
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}
