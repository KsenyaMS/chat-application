import { RouteCode, routeData } from "./route-data";

export const getRouteCode = (pathname: string): RouteCode => {
    return Object.values(routeData)
        .find(route => route.path === pathname
            || (
                route.path.includes(':')
                && route.path.split('/').length === pathname.split('/').length
                && pathname.includes(route.path.split('/:').shift() ?? '')
            ))?.code ?? RouteCode.Authorization;
}

export const getFullUrl = (path: string, paramKey: string, paramValue: string) => {
    return path.replace(`:${paramKey}`, paramValue);
}

export const getParams = (path: string, routeCode: RouteCode) => {
    const pathFromRoute = Object.values(routeData).find(item => item.code === routeCode)?.path?.split('/');
    const activePath = path.split('/');
    const params = pathFromRoute
        ?.reduce((acc: any[], curVal, idx) => {
            return curVal.includes(':')
                ? [
                    ...acc,
                    {
                        paramName: curVal.replace(':', ''),
                        paramValue: activePath[idx],
                    }
                ]
                : acc
        }, []);

    return params;
}