import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import data from './data'

export type CompleteAuthSessionResult = {
    type: 'error' | 'success';
    errorCode: string | null;
    error?: AuthSession.AuthError | null | undefined;
    params: {
        code: string,
        state: string
    };
    authentication: AuthSession.TokenResponse | null;
    url: string;
}

export default class MalApi{
    public clientId = data.clientId

    public baseUrlOAuth = "https://myanimelist.net/v1/oauth2"
    public discovery = {
        authorizationEndpoint: `${this.baseUrlOAuth}/authorize`,
        tokenEndpoint: `${this.baseUrlOAuth}/token`
    }
    public redirectUri = AuthSession.makeRedirectUri({
        native: 'animowo://login/',
        useProxy: true
    });
    public promptAsync: (options?: AuthSession.AuthRequestPromptOptions | undefined) => Promise<AuthSession.AuthSessionResult>

    constructor(){
        WebBrowser.maybeCompleteAuthSession();

        const [request, result, promptAsync] = AuthSession.useAuthRequest({
            clientId: this.clientId,
            redirectUri: this.redirectUri,
            responseType: 'code',
            codeChallenge: '1234',
        }, this.discovery )

        this.promptAsync = promptAsync
    }

    async login(): Promise<CompleteAuthSessionResult | undefined>{
        const response = await this.promptAsync({useProxy: true})
        const completeResponse = response as CompleteAuthSessionResult

        if(completeResponse.params)
            return completeResponse
        else
            return undefined
    }
}
