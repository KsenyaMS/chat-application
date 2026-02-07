import { Text, TextInput, useMantineTheme } from "@mantine/core";
import { UseFormRegister } from "react-hook-form";

const css = {
    errorTextStyle: {
        fontSize: '13px',
    }
}

export type EmailInputWithValidationProps = {
    errorObj?: { [key: string]: { message: string } },
    register: UseFormRegister<any>
}

export const EmailInputWithValidation = ({ errorObj, register }: EmailInputWithValidationProps) => {
    const mantineTheme = useMantineTheme();

    return <>
        <TextInput
            label="Email"
            placeholder="user_name@mail.ru"
            required
            radius="md"
            style={{
                ...(!errorObj?.['email']
                    ? { marginBottom: '10px' }
                    : {}
                ),
            }}
            {...register("email")}
        />
        {errorObj?.['email'] &&
            <Text style={{ ...css.errorTextStyle, color: mantineTheme.colors.red[8] }}>
                {errorObj['email'].message}
            </Text>
        }
    </>
}