import * as microsoftTeams from '@microsoft/teams-js';
import { ITokens } from '../callback';
import { SPOTIFY_TAB } from '../routes/consts';

export let spotifyToken = '';
export let spotifyRefreshToken = '';

export const initializeTeams = () => {
    microsoftTeams.initialize();

    // Save configuration changes
    microsoftTeams.settings.registerOnSaveHandler((saveEvent) => {
        // Let the Microsoft Teams platform know what you want to load based on
        // what the user configured on this page
        const searchParams = new URLSearchParams('');
        searchParams.set('access_token', spotifyToken);
        searchParams.set('refresh_token', spotifyRefreshToken);
        const tabUrl = window.location.protocol + '//' + window.location.host + SPOTIFY_TAB + '?' + searchParams.toString();
        microsoftTeams.settings.setSettings({
            contentUrl: tabUrl, // Mandatory parameter
            entityId: tabUrl // Mandatory parameter
        });        

        // Tells Microsoft Teams platform that we are done saving our settings. Microsoft Teams waits
        // for the app to call this API before it dismisses the dialog. If the wait times out, you will
        // see an error indicating that the configuration settings could not be saved.
        saveEvent.notifySuccess();
    });
};

export const validateSettingsState = (tokens: { refreshToken: string, token: string }) => {
    // This API tells Microsoft Teams to enable the 'Save' button. Since Microsoft Teams always assumes
    // an initial invalid state, without this call the 'Save' button will never be enabled.
    spotifyToken = tokens.token || '';
    spotifyRefreshToken = tokens.refreshToken || '';
    microsoftTeams.settings.setValidityState(!!spotifyToken && !!spotifyRefreshToken);
}

export const auth = () => {
    microsoftTeams.authentication.authenticate({
        height: 600,
        url: window.location.origin + "/login",
        width: 600,
        successCallback(result) {
            validateSettingsState(result as any as ITokens);
        },
        failureCallback(reason) {
            // TODO: show error          
        }
    });
}

export const notifyAuthenticationSuccess = (token: ITokens) => {
    microsoftTeams.authentication.notifySuccess(token as any);
};