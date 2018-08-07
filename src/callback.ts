import createHistory from "history/createBrowserHistory"

export interface ITokens {
    token: string;
    refreshToken: string;
}

export const listenForCallback = () => {
    return new Promise<ITokens>((res, rej) => {
        const history = createHistory();
        const checkLocationForCallback = () => {
            const searchParams = new URLSearchParams(history.location.search || '');
            const token = searchParams.get('access_token');
            const refreshToken = searchParams.get('refresh_token');
            if (token) {
                res({ refreshToken, token } as any);
            }
        };
        checkLocationForCallback();
        history.listen((location, action) => {
            checkLocationForCallback();
        });
    });
}