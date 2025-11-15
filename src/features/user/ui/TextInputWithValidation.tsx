import { Text, TextInput, useMantineTheme } from "@mantine/core";
import { UseFormRegister } from "react-hook-form";

const css = {
    errorTextStyle: {
        fontSize: '13px',
    }
}

export type TextInputWithValidationProps = {
    errorObj?: { [key: string]: { message: string } },
    register: UseFormRegister<any>,
    code: string,
    text: string,
}

export const TextInputWithValidation = ({
    errorObj,
    register,
    code,
    text,
}: TextInputWithValidationProps) => {
    const mantineTheme = useMantineTheme();

    return <>
        <TextInput
            label={text}
            placeholder={text}
            required
            radius="md"
            {...register(code)}
        />
        {errorObj?.[code] &&
            <Text style={{ ...css.errorTextStyle, color: mantineTheme.colors.red[8] }}>
                {errorObj[code].message}
            </Text>
        }
    </>
}