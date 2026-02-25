import { Box } from "@mantine/core"
import { LogOutButton, ThemeButton, useSessionProvider } from "../../../features"
import { UserType } from "../../../api";

export const HeaderRightBlock = () => {
    const { userType } = useSessionProvider();
    return (
        <Box display={'flex'} style={{ gap: 20 }}>
            <ThemeButton />
            {userType == UserType.User &&
                <LogOutButton />
            }
        </Box>
    )
}