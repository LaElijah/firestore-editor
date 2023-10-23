"use client"
import {
    Pill,
    PillsInput,
    Combobox, useCombobox
} from "@mantine/core"
import { useCallback, useEffect, useState } from "react"
import OptionGroup from "./elements/optionGroup";





export default function MultiSelect(
    {
        onChange,
        options,
        label

    }: MultiSelectProps
) {
    const [input, setInput] = useState("");
    const [currentOptions, setCurrentOptions] = useState<Option[]>([])

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
      });


    const handleAddValue = (event: string) => {
        setCurrentOptions(
            (current) => {
                const labels = (current.map((element) => element.label))
                let result =
                    labels.includes(event)
                        ? current.filter((element) => element.label !== event)
                        : [...current, {
                            label: event, 
                            group: (options.find((element: Option) => event === element.label ))?.group
                        } as Option]

                return result
            }
        )
        setInput("")
        combobox.closeDropdown()
}

useEffect(() => {
    onChange(currentOptions)
}, [currentOptions])

   

    const handleRemoveValue = (event: string) => {
        setCurrentOptions(
            (current) => {
                let result = current.filter((element) => element.label !== event)
                return result
            }
        )
    }


     // TODO: Update object for these to a different style 

     const selectedValues = currentOptions.map(({label}) => (
        <Pill key={label} withRemoveButton onRemove={() => handleRemoveValue(label)}>
          {label}
        </Pill>
      ));

    



    return (
        <Combobox label={label} store={combobox} onOptionSubmit={handleAddValue}>
            <Combobox.DropdownTarget >
                <PillsInput onClick={() => combobox.openDropdown()}>
                    <Pill.Group>

                        {selectedValues}

                        <Combobox.EventsTarget>
                            <PillsInput.Field
                                onFocus={() => combobox.openDropdown()}
                                onBlur={() => combobox.closeDropdown()}
                                value={input}
                                placeholder="Search values"
                                onChange={(event) => {
                                    combobox.updateSelectedOptionIndex();
                                    setInput(event.target.value);
                                }}
                                onKeyDown={(event) => {
                                    combobox.openDropdown()
                                    if (event.key === 'Backspace' && input.length === 0 && currentOptions.length > 0) {
                                        event.preventDefault();
                                        handleRemoveValue(currentOptions[currentOptions.length - 1].label);
                                    }
                                    else if (event.key === 'Enter' && input.length > 0) {
                                        event.preventDefault();
                                        handleAddValue(input)
                                    }
                                }}
                            />
                        </Combobox.EventsTarget>
                    </Pill.Group>
                </PillsInput>
            </Combobox.DropdownTarget>



            <Combobox.Dropdown>
                <OptionGroup
                    currentOptions={currentOptions}
                    options={options}
                    search={input}
                    />
            </Combobox.Dropdown>
        </Combobox>
    )


}