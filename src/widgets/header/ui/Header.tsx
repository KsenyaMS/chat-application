import { CssComponent } from "../../../shared";
import { LogOutButton, ThemeButton, UserType, useSessionProvider } from "../../../features";
import { Box } from "@mantine/core";
import { HeaderDropdownList } from "./HeaderDropdownList";

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
    const { userType } = useSessionProvider();


    return <div style={css.header}>
        <Box>
            {userType == UserType.User &&
                <HeaderDropdownList />
            }
        </Box>
        <Box display={'flex'} style={{ gap: 20 }}>
            <ThemeButton />
            {userType == UserType.User &&
                <LogOutButton />
            }
        </Box>
    </div>
}