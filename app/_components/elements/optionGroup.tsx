"use client"

import {
    Combobox
} from "@mantine/core"
import SelectOption from "./selectOption"



export default function OptionGroup(
   { currentOptions,
    options,
    search
   }:
   {
    currentOptions: Option[],
    options: Option[],
    search: string
   }
){



    const searchedOptions = options
        .filter(({ label }: Option) => label
            .toLowerCase()
            .includes(search.trim().toLowerCase()))

    return (
        <Combobox.Options>
            {
            searchedOptions.length > 0
            ? searchedOptions.map(({ group }) => (
                <Combobox.Group key={group} label={group}>
                    {searchedOptions.map((element) => {
                        if (element.group === group) return (<SelectOption key={element.label} currentOptions={currentOptions} element={element} />)
                    })}
                </Combobox.Group>
            ))
            : <SelectOption key={search} currentOptions={currentOptions} element={{label: search, group: "new"}} />  // TODO: Add an ability to change new elements to cutsom groups
        }
        </Combobox.Options>
    )
}