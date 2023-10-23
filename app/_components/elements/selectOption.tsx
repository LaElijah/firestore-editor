"use client"
import {
    Combobox, CheckIcon, Group, useCombobox
} from "@mantine/core"


export default function SelectOption({ element, currentOptions }: SelectOptionProps){
    return (
        <Combobox.Option
            value={element.label}
            key={element.label}
            active={currentOptions.includes(element)}
        >
            <Group gap="sm">
                {currentOptions.includes(element) ? <CheckIcon size={12} /> : null}
                <span>{element.label}</span>
            </Group>
        </Combobox.Option>
    )
}
