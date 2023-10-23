type Option = {
    label: string;
    group?: string;
}

interface MultiSelectProps {
    onChange: (event: Option[]) => void
    options: Option[]
    label: string
}

interface SelectOptionProps {
    element: Option,
    currentOptions: Option[]
}