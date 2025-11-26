import { useLocation, useNavigate } from "react-router-dom";
import { AuthorizationForm, ForgotPasswordForm, RegistrationForm } from "../../../widgets"
import { getRouteCode, RouteCode, routeData } from "../../../shared";
import { useEffect } from "react";
import { UserType, useSessionProvider } from "../../../features";

export const AuthorizationPage = () => {
    const navigate = useNavigate();
    const { userType } = useSessionProvider();
    const { pathname } = useLocation();
    const routeCode = getRouteCode(pathname);

    useEffect(() => {
        if (userType === UserType.User)
            navigate(routeData.forgotPasswordPage.path);
    }, [userType]);

    return (
        <div>
            {routeCode === RouteCode.Authorization && <AuthorizationForm />}
            {routeCode === RouteCode.Registration && <RegistrationForm />}
            {routeCode === RouteCode.ForgotPassword && <ForgotPasswordForm />}
        </div>
    )
}