const server = process.env.EXPO_PUBLIC_SERVER || "http://localhost:8080";
export const apiRoutes = {
    "login": () => `${server}/auth/login`,
    "emailAvilable": () => `${server}/auth/verify-email-availability`,
    "register": () => `${server}/auth/register`,
    "sendReset": () => `${server}/auth/send-reset-email`,
    "resetPassword": () => `${server}/auth/reset-password`,
    "verifyCode": () => `${server}/auth/verify-reset-code`,
    "user": () => `${server}/resource/user`,
    "user/[id]": (id: string) => `${server}/resource/user/${id}`,   
};


export type ApiRoutes = typeof apiRoutes;
export type ApiRoute = keyof ApiRoutes;


export type ApiRouteParams<T extends ApiRoute> = Parameters<ApiRoutes[T]>;