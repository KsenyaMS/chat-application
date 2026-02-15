import { CssComponent, getParams, getRouteCode, RouteCode } from "../../../shared";
import { LogOutButton, ReturnButton, ThemeButton, useSessionProvider } from "../../../features";
import { Box } from "@mantine/core";
import { HeaderDropdownList } from "./HeaderDropdownList";
import { UserType } from "../../../api";
import { useLocation } from "react-router-dom";

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
    const { pathname } = useLocation();
    const routeCode = getRouteCode(pathname);
    const params = getParams(pathname, routeCode);

    return <div style={css.header}>
        <Box>
            {userType == UserType.User && routeCode !== RouteCode.Dialog &&
                <HeaderDropdownList />
            }
            {userType == UserType.User && routeCode === RouteCode.Dialog &&
                <ReturnButton />
            }
        </Box>
        <Box>

        </Box>
        <Box display={'flex'} style={{ gap: 20 }}>
            <ThemeButton />
            {userType == UserType.User &&
                <LogOutButton />
            }
        </Box>
    </div>
}