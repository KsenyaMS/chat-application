import { Anchor, Group } from "@mantine/core"
import { useNavigate } from "react-router-dom";
import { routeData } from "../../../shared";

export const ForgotPasswordButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(routeData.forgotPasswordPage.path);
    }

    return <Group justify="space-between" mt="lg">
        <Anchor
            component="button"
            size="sm"
            onClick={handleClick}
        >
            Сменить пароль
        </Anchor>
    </Group>
}