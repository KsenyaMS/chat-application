import { PasswordInput, Text, useMantineTheme } from "@mantine/core";
import { UseFormRegister } from "react-hook-form";

const css = {
    errorTextStyle: {
        fontSize: '13px',
    }
}

export type PasswordInputWithValidationProps = {
    errorObj?: { [key: string]: { message: string } },
    register: UseFormRegister<any>,
    code?: string,
}

export const PasswordInputWithValidation = ({ errorObj, register, code = 'password' }: PasswordInputWithValidationProps) => {
    const mantineTheme = useMantineTheme();

    return <>
        <PasswordInput
            label="Пароль"
            placeholder="Пароль"
            required
            mt="md"
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