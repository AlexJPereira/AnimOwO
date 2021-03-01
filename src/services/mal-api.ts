import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Store from './store'

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
    private clientId = data.clientId
    private authCode = ""
    private acessToken = ""
    private refreshToken = ""
    private codeChallenge = ""
    private codeVerifier = ""

    private baseUrlOAuth = "https://myanimelist.net/v1/oauth2"
    private discovery = {
        authorizationEndpoint: `${this.baseUrlOAuth}/authorize`,
        tokenEndpoint: `${this.baseUrlOAuth}/token`
    }
    private redirectUri = AuthSession.makeRedirectUri({
        native: 'animowo://login/',
        useProxy: true
    })
    private tokenAcessConfig: AuthSession.AccessTokenRequestConfig = {
        clientId: data.clientId,
        code: "",
        redirectUri: this.redirectUri,
        extraParams: {"code_verifier": ""}
    }
    private authAcessConfig: AuthSession.AuthRequestConfig = {
        clientId: this.clientId,
        redirectUri: this.redirectUri,
        responseType: 'code',
        codeChallenge: ""
    }
    private authRequest

    constructor(){
        WebBrowser.maybeCompleteAuthSession();
        const [request, result, promptAsync] = AuthSession.useAuthRequest(this.authAcessConfig, this.discovery)
        const authRequest = {request, result, promptAsync}
        this.authRequest = authRequest
    }

    async login(){
        await this.checkCodeChallenge()
        await this.checkAuthCode()
        try{
            await this.checkAcessToken()
        } catch {
            await this.getNewAuthCode()
            await this.checkAcessToken()
        }
        this.printTokens()
    }

    async checkCodeChallenge(){
        const codeChallenge = await Store.getValue('codeChallenge')

        if(!codeChallenge){
            await this.getNewCodeChallenge()
        } else {
            this.codeChallenge = codeChallenge
            this.authAcessConfig.codeChallenge = codeChallenge
        }
    }

    async getNewCodeChallenge(){
        const codeChallenge = await AuthSession.generateHexStringAsync(43)
        await Store.setValue('codeChallenge', codeChallenge)
        this.codeChallenge = codeChallenge
        this.authAcessConfig.codeChallenge = this.codeChallenge
        return codeChallenge
    }

    async checkAuthCode(){
        const authCode = await Store.getValue('authCode')
        const codeVerifier = await Store.getValue('codeVerifier')

        if(!authCode || !codeVerifier){
            await this.getNewAuthCode()
        } else {
            this.authCode = authCode
            this.tokenAcessConfig.code = authCode
            this.codeVerifier = codeVerifier
            this.tokenAcessConfig.extraParams = {"code_verifier": codeVerifier }
        } 
    }

    async getNewAuthCode(){
        const response = await this.authRequest.promptAsync({useProxy: true, url: this.authRequest.request?.url?.replace("&code_challenge_method=S256","")})
        const completeResponse = response as CompleteAuthSessionResult

        if(completeResponse.type == 'success' && completeResponse.params){
            this.codeVerifier = (this.authRequest.request?.codeChallenge) ? this.authRequest.request?.codeChallenge : ""
            this.tokenAcessConfig.extraParams = {"code_verifier": this.codeVerifier }
            this.authCode = completeResponse.params.code
            this.tokenAcessConfig.code = this.authCode

            await Store.setValue('codeVerifier', this.codeVerifier)
            await Store.setValue('authCode', this.authCode)
            return this.authCode
        } else {
            return undefined
        }
    }

    async checkAcessToken(){
        const acessToken = await Store.getValue('acessToken')
        const refreshToken = await Store.getValue('refreshToken')

        if(!acessToken || !refreshToken){
            await this.getNewAcessToken()
        } else {
            this.acessToken = acessToken
            this.refreshToken = refreshToken
        }
    }

    async getNewAcessToken(){
        const response = await AuthSession.exchangeCodeAsync(this.tokenAcessConfig, this.discovery)
        this.acessToken = response.accessToken
        this.refreshToken = response.refreshToken ? response.refreshToken : ""
        await Store.setValue('acessToken', this.acessToken)
        await Store.setValue('refreshToken', this.refreshToken)
        return this.acessToken
    }

    printTokens(){
        console.log("--------------- tokens ----------------")
        console.log("Auth Code:", this.authCode, "\n")
        console.log("Acess Token:", this.acessToken, "\n")
        console.log("Refresh Token:", this.refreshToken, "\n")
        console.log("Code Challenge:", this.codeChallenge, "\n")
        console.log("Code Verifier:", this.codeVerifier, "\n")
        console.log("---------------------------------------")
    }
}
