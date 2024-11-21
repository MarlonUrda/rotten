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
    // Playlist
    "playlist": () => `${server}/user/playlist`,
    ":id/playlist": (id: string) => `${server}/user/${id}/playlist`,
    "playlist/:id": (id: string) => `${server}/user/playlist/${id}`, 

    // Games
    "popular": () => `${server}/games/popular`,
    "game/:id": (id: string) => `${server}/games/${id}`,
    "game/:id/screenshots": (id: number) => `${server}/games/${id}/screenshots`,
    // Comments
    "reviews": (id: string) => `${server}/games/${id}/reviews`,
    "reviews/:id": (id: string | number, reviewId: string) => `${server}/games/${id}/reviews/${reviewId}`
};


export type ApiRoutes = typeof apiRoutes;
export type ApiRoute = keyof ApiRoutes;


export type ApiRouteParams<T extends ApiRoute> = Parameters<ApiRoutes[T]>;