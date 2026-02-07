import { Text, TextInput, useMantineTheme } from "@mantine/core";
import { UseFormRegister } from "react-hook-form";
import { CssComponent } from "../../../shared";

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
    style?: CssComponent,
}

export const TextInputWithValidation = ({
    errorObj,
    register,
    code,
    text,
    style,
}: TextInputWithValidationProps) => {
    const mantineTheme = useMantineTheme();

    return <>
        <TextInput
            label={text}
            placeholder={text}
            required
            radius="md"
            {...register(code)}
            style={{
                ...(!errorObj?.[code]
                    ? { marginBottom: '10px' }
                    : {}
                ),
                ...style,
            }}
        />
        {errorObj?.[code] &&
            <Text style={{ ...css.errorTextStyle, color: mantineTheme.colors.red[8] }}>
                {errorObj[code].message}
            </Text>
        }
    </>
}