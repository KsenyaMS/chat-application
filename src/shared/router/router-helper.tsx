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

export type PathParam = {
    [key: string]: string | number,
}

export const getParams = (path: string, routeCode: RouteCode): PathParam | undefined => {
    const pathFromRoute = Object.values(routeData).find(item => item.code === routeCode)?.path?.split('/');
    const activePath = path.split('/');
    const params = pathFromRoute
        ?.reduce((acc: PathParam, curVal, idx) => {
            return curVal.includes(':')
                ? {
                    ...acc,
                    [curVal.replace(':', '')]: activePath[idx],
                }
                : acc
        }, {});

    return params;
}