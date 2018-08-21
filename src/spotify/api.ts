import { Device, Playlist, Track, User } from "../state/state";

export const apiUrl = 'https://api.spotify.com/v1/';
export const GET = { 'method': 'GET' }
export const POST = { 'method': 'POST' };
export const PUT = { 'method': 'PUT' };

const getHeaders = (token: string) => {
    return {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json; charset=utf-8",
        }
    }
}

const queryParamsHelper = (url: string, queryPrams: { [key: string]: string | undefined }) => {
    const sP = Object.keys(queryPrams).reduce((searchParams, key) => {
        const v = queryPrams[key];
        if (v != null) {
            searchParams.set(key, v);
        }
        return searchParams;
    }, new URLSearchParams()).toString();
    return sP ? `${url}?${sP}` : url;
}

export const getApi = (token: string, refreshToken: string) => {
    let headers = getHeaders(token);

    const refreshTokenFunc = async () => {
        const searchParams = new URLSearchParams();
        searchParams.set('refresh_token', refreshToken);
        return ((await (await fetch(`/refresh_token?${searchParams.toString()}`)).json()) as { 'access_token': string }).access_token;
    };

    const makeRequest = async <T>(urlPart: string, options: RequestInit, retry = false): Promise<T> => {
        const response = await fetch(`${apiUrl}${urlPart}`, options);
        if (response.ok) {
            if (response.status === 204) {
                return undefined as any;
            }
            return response.json() as Promise<T>
        }

        if (response.status === 401) {
            if (!retry) {
                // try to refresh token
                token = await refreshTokenFunc();
                headers = getHeaders(token);
                return makeRequest(urlPart, { ...options, ...headers }, true) as Promise<T>;
            } else {
                throw new Error('Invalid token: ' + await response.text());
            }
        }

        throw new Error('Unknown error: status code' + response.status + ' ; ' + await response.text());
    }
    return {
        me: {
            get: async () => {
                return makeRequest<User>('me', {
                    ...GET, ...headers
                });
            }
        },
        player: {
            devices: {
                get: async () => {
                    return makeRequest<{ devices: Device[] }>('me/player/devices', {
                        ...GET, ...headers
                    });
                }
            },
            play: {
                put: async (params: { trackUri?: string, offset?: number, albumUri?: string, deviceId?: string }) => {
                    const { trackUri, albumUri, deviceId, offset } = params;
                    const body = JSON.stringify({
                        ...(trackUri ? { "uris": [trackUri] } : {}),
                        ...(albumUri ? { "context_uri": albumUri } : {}),
                        ...(offset !== void 0 ? { "offset": { "position": offset } } : {})
                    });
                    return makeRequest<void>(queryParamsHelper(`me/player/play`, { 'device_id': deviceId }), {
                        body, ...PUT, ...headers
                    });
                }
            }
        },
        playlists: {
            get: async () => {
                return makeRequest<{ items: Playlist[] }>('me/playlists', {
                    ...GET, ...headers
                });
            },
            tracks: {
                get: async (playlist: Playlist, options?: { fields?: string, limit?: number, offset?: number }) => {
                    const opt = { fields: 'items(track(id,name,uri,album(id,name),artists(id,name))),limit,offset,total', limit: 100, offset: 0, ...options };
                    const userId = playlist.owner.id;
                    const playlistId = playlist.id
                    const sP = Object.keys(opt).reduce((searchParams, key) => {
                        searchParams.set(key, opt[key]);
                        return searchParams;
                    }, new URLSearchParams());
                    return await makeRequest<{ items: Track[], limit: number, offset: number, total: number }>(`users/${userId}/playlists/${playlistId}/tracks?${sP.toString()}`, {
                        ...GET, ...headers
                    });
                },
                async getAll(playlist: Playlist) {
                    let tracks = [] as Track[];
                    const limit = 100;
                    let getOperations = 1;
                    let i = 0;
                    let offset = 0;
                    while (i < getOperations) {
                        const res = await this.get(playlist, { limit, offset });
                        i++;
                        offset += limit;
                        getOperations = Math.ceil(res.total / limit);
                        tracks = tracks.concat(res.items);
                    }

                    return tracks;
                }
            }
        },
        token: {
            get: async () => {
                const searchParams = new URLSearchParams();
                searchParams.set('refresh_token', refreshToken);
                return (await (await fetch(`/refresh_token?${searchParams.toString()}`)).text());
            }
        }
    }
};

const tempAPI = getApi('', '');
export type Api = typeof tempAPI;