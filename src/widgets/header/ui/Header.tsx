import { CssComponent } from "../../../shared";
import { MenuButton, ThemeButton, UserType } from "../../../features";
import { useUserInfo } from "../../authorization-form";
import { Stack } from "@mantine/core";

const css: CssComponent = {
    header: {
        width: '100%',
        height: '55px',
        boxSizing: 'border-box',
        padding: '5px 20px 5px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}

export const Header = () => {
    const { user } = useUserInfo();

    return <div style={css.header}>
        <Stack>
            {user.userType == UserType.User &&
                <MenuButton />
            }
        </Stack>
        <ThemeButton />
    </div>
}