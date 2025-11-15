import { RouteCode, routeData } from "./route-data"

export const getRouteCode = (pathname: string): RouteCode => {
    return routeData.find(route => route.path === pathname)?.code ?? RouteCode.Authorization;
}