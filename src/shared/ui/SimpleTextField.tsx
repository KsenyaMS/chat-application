import { Input } from "@mantine/core"
import { ReactElement } from "react"

export type SimpleTextFieldProps = {
    text: string,
    icon?: ReactElement,
    onChange: (value: string) => void,
}

export const SimpleTextField = ({ text, onChange, icon }: SimpleTextFieldProps) => {
    return <Input
        placeholder={text}
        leftSection={icon}
        onChange={(event) => onChange(event.target.value)}
    />
}