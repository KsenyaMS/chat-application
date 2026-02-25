import { Box } from "@mantine/core"
import { HeaderDropdownList } from "./HeaderDropdownList"
import { ReturnButton, useSessionProvider } from "../../../features"
import { UserType } from "../../../api"
import { getRouteCode, RouteCode } from "../../../shared"
import { useLocation } from "react-router-dom"

export const HeaderLeftBlock = () => {
    const { userType } = useSessionProvider();
    const { pathname } = useLocation();
    const routeCode = getRouteCode(pathname);

    return (
        <Box>
            {userType == UserType.User && routeCode !== RouteCode.Dialog &&
                <HeaderDropdownList />
            }
            {userType == UserType.User && routeCode === RouteCode.Dialog &&
                <ReturnButton />
            }
        </Box>
    )
}