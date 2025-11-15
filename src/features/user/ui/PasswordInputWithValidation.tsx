import { PasswordInput, Text, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { UseFormRegister } from "react-hook-form";

const css = {
    errorTextStyle: {
        fontSize: '13px',
    }
}

export type PasswordInputWithValidationProps = {
    errorObj?: { [key: string]: { message: string } },
    register: UseFormRegister<any>
}

export const PasswordInputWithValidation = ({ errorObj, register }: PasswordInputWithValidationProps) => {
    const mantineTheme = useMantineTheme();

    return <>
        <PasswordInput
            label="Пароль"
            placeholder="Пароль"
            required
            mt="md"
            radius="md"
            {...register("password")}
        />
        {(errorObj?.['password'] || errorObj?.['auth']) &&
            <Text style={{ ...css.errorTextStyle, color: mantineTheme.colors.red[8] }}>
                {errorObj['password']
                    ? errorObj['password'].message
                    : errorObj['auth'].message
                }
            </Text>
        }
    </>
}