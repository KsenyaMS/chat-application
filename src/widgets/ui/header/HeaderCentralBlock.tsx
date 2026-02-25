import { Box } from "@mantine/core"
import { ContainerWithTwoValues, getParams, getRouteCode, RouteCode } from "../../../shared"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { messageModel, userModel, UserModel, useSessionProvider } from "../../../features";
import { UserType } from "../../../api";

export const HeaderCentralBlock = () => {
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

    return (
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
    )
}