import { ContainerWithTwoValues, CssComponent, getParams, getRouteCode, RouteCode } from "../../../shared";
import { LogOutButton, messageModel, ReturnButton, ThemeButton, userModel, UserModel, useSessionProvider } from "../../../features";
import { Box } from "@mantine/core";
import { HeaderDropdownList } from "./HeaderDropdownList";
import { UserType } from "../../../api";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

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
    const { userType, sessionParams } = useSessionProvider();
    const { pathname } = useLocation();
    const routeCode = getRouteCode(pathname);
    const params = getParams(pathname, routeCode);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [interlocutorInfo, setInterlocutorInfo] = useState<UserModel | undefined>();

    const getInterlocutorInfo = async (dialogId: string) => {
        setIsLoading(true);
        const dialog = await messageModel.fetchDialogById(sessionParams?.userInfo.id, dialogId);
        const info = await userModel.fetchUserInfoById(dialog?.interlocutor.id);
        setInterlocutorInfo(info);
        setIsLoading(false);
    }

    useEffect(() => {
        if (!params?.dialogId)
            return;

        getInterlocutorInfo(params.dialogId.toString());
    }, [params?.dialogId])

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
            {userType == UserType.User && routeCode === RouteCode.Dialog &&
                <>
                    {!isLoading && interlocutorInfo &&
                        <ContainerWithTwoValues
                            primaryValue={interlocutorInfo.FIO}
                            secondaryValue={interlocutorInfo.email}
                            textAlign={'center'}
                        />
                    }
                    {isLoading &&
                        <></>
                    }
                </>
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