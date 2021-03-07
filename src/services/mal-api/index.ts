import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import data from '../data'
import { baseUrlOAuth } from './axios'
import * as LoginFunc from './login'
import * as UserFunc from './user'
import * as AnimeFunc from './anime'

export type CompleteAuthSessionResult = LoginFunc.CompleteAuthSessionResult

export default class MalApi{
    protected clientId = data.clientId
    protected authCode = ""
    protected acessToken = ""
    protected refreshToken = ""
    protected codeChallenge = ""
    protected codeVerifier = ""

    protected baseUrlOAuth = 'https://myanimelist.net/v1/oauth2'
    protected discovery = {
        authorizationEndpoint: `${this.baseUrlOAuth}/authorize`,
        tokenEndpoint: `${this.baseUrlOAuth}/token`
    }
    protected redirectUri = AuthSession.makeRedirectUri({
        native: 'animowo://login/',
        useProxy: true
    })
    protected tokenAcessConfig: AuthSession.AccessTokenRequestConfig = {
        clientId: data.clientId,
        code: "",
        redirectUri: this.redirectUri,
        extraParams: {"code_verifier": ""}
    }
    protected authAcessConfig: AuthSession.AuthRequestConfig = {
        clientId: this.clientId,
        redirectUri: this.redirectUri,
        responseType: 'code',
        codeChallenge: ""
    }
    protected authRequest

    constructor(){
        WebBrowser.maybeCompleteAuthSession();
        const [request, result, promptAsync] = AuthSession.useAuthRequest(this.authAcessConfig, this.discovery)
        const authRequest = {request, result, promptAsync}
        this.authRequest = authRequest
    }

    isLoggedIn = LoginFunc.isLoggedIn.bind(this)
    login = LoginFunc.login.bind(this)
    logoff = LoginFunc.logoff.bind(this)
    checkCodeChallenge = LoginFunc.checkCodeChallenge.bind(this)
    getNewCodeChallenge = LoginFunc.getNewCodeChallenge.bind(this)
    checkAuthCode = LoginFunc.checkAuthCode.bind(this)
    getNewAuthCode = LoginFunc.getNewAuthCode.bind(this)
    checkAcessToken = LoginFunc.checkAcessToken.bind(this)
    getNewAcessToken = LoginFunc.getNewAcessToken.bind(this)
    checkConnection = LoginFunc.checkConnection.bind(this)
    printTokens = LoginFunc.printTokens.bind(this)

    getUserProfileInfo = UserFunc.getUserProfileInfo.bind(this)
    getUserList = UserFunc.getUserList.bind(this)
    updateAnimeInfo = UserFunc.updateAnimeInfo.bind(this)
    deleteAnimeFromList = UserFunc.deleteAnimeFromList.bind(this)

    searchAnime = AnimeFunc.searchAnime.bind(this)
    getAnimeDetails = AnimeFunc.getAnimeDetails.bind(this)
    getAnimeRankingList = AnimeFunc.getAnimeRankingList.bind(this)
    getSeasonalAnime = AnimeFunc.getSeasonalAnime.bind(this)
    getSuggestedAnime = AnimeFunc.getSuggestedAnime.bind(this)
    
}
