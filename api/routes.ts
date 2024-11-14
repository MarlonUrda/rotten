const server = process.env.EXPO_PUBLIC_SERVER || "http://localhost:8080";
export const apiRoutes = {
    "login": () => `${server}/auth/login`,
    "checkEmail": () => `${server}/auth/check-email`,
    "register": () => `${server}/auth/register`,
    "sendReset": () => `${server}/auth/send-reset-email`,
    "resetPassword": () => `${server}/auth/reset-password`,
    "verifyCode": () => `${server}/auth/verify-reset-code`,
    "user": () => `${server}/user`,
    "user/[id]": (id: string) => `${server}/user/${id}`,   

    // Games
    "popular": () => `${server}/games/popular`,
    "game/:id": (id: number) => `${server}/games/${id}`,
    // Comments
    "comments": (id: number) => `${server}/games/${id}/comments`,
    "comments/:id": (id: number, commentId: string) => `${server}/games/${id}/comments/${commentId}`
};


export type ApiRoutes = typeof apiRoutes;
export type ApiRoute = keyof ApiRoutes;


export type ApiRouteParams<T extends ApiRoute> = Parameters<ApiRoutes[T]>;