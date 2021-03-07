import AuthSession, { generateHexStringAsync, exchangeCodeAsync } from 'expo-auth-session'
import MalApi from './'
import * as Store from '../store'
import api from './axios'
import { printError } from '../error'

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

/** Checa se todas as variáveis importantes estão setadas e checa a conexão com a API do MAL para ver se os tokens estão certos */
export async function isLoggedIn(this: MalApi){
    if(this.codeChallenge && this.codeVerifier && this.authCode && this.acessToken && this.refreshToken){
        return await this.checkConnection()
    } else {
        return false
    }
}

/** Função completa de login, fazendo todas as checagens e se necessário, requisitando autorização do usuário */
export async function login(this: MalApi){
    await this.checkCodeChallenge()
    await this.checkAuthCode()
    try{
        await this.checkAcessToken()
    } catch {
        await this.getNewAuthCode()
        await this.checkAcessToken()
    }
    //this.printTokens()
}

export async function logoff(this: MalApi){
    await Store.removeValue('acessToken')
    await Store.removeValue('authCode')
    await Store.removeValue('codeChallenge')
    await Store.removeValue('codeVerifier')
    await Store.removeValue('refreshToken')
}

/** Checa se ja existe um `code challenge`, caso contrário faz a requisição de um novo */
export async function checkCodeChallenge(this: MalApi){
    const codeChallenge = await Store.getValue('codeChallenge')

    if(!codeChallenge){
        await this.getNewCodeChallenge()
    } else {
        this.codeChallenge = codeChallenge
        this.authAcessConfig.codeChallenge = codeChallenge
    }
}

/** Faz a requisição de um novo `code challenge` e o salva dentro do Safe Storage do Expo
 * 
 * É recomendado o uso da função `checkCodeChallenge` ou `login` ao invés dessa
*/
export async function getNewCodeChallenge(this: MalApi){
    const codeChallenge = await generateHexStringAsync(43)
    await Store.setValue('codeChallenge', codeChallenge)
    this.codeChallenge = codeChallenge
    this.authAcessConfig.codeChallenge = this.codeChallenge
    return codeChallenge
}

/** Checa se ja existe um `auth code`, caso contrário faz a requisição de um novo */
export async function checkAuthCode(this: MalApi){
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

/** Faz a requisição de um novo `auth code` e o salva dentro do Safe Storage do Expo
 * 
 * É recomendado o uso da função `checkAuthCode` ou `login` ao invés dessa
*/
export async function getNewAuthCode(this: MalApi){
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

/** Checa se ja existe um `acess token` e um `refresh token`, caso contrário faz a requisição de novos */
export async function checkAcessToken(this: MalApi){
    const acessToken = await Store.getValue('acessToken')
    const refreshToken = await Store.getValue('refreshToken')

    if(!acessToken || !refreshToken){
        await this.getNewAcessToken()
    } else {
        this.acessToken = acessToken
        this.refreshToken = refreshToken
        api.defaults.headers["Authorization"] = `Bearer ${this.acessToken}`
    }
}

/** Faz a requisição de um novo `acess token` e um `refresh token` através do auth code e o salva dentro do Safe Storage do Expo
 * 
 * É recomendado o uso da função `checkAcessToken` ou `login` ao invés dessa
*/
export async function getNewAcessToken(this: MalApi){
    const response = await exchangeCodeAsync(this.tokenAcessConfig, this.discovery)
    this.acessToken = response.accessToken
    this.refreshToken = response.refreshToken ? response.refreshToken : ""
    await Store.setValue('acessToken', this.acessToken)
    await Store.setValue('refreshToken', this.refreshToken)
    api.defaults.headers["Authorization"] = `Bearer ${this.acessToken}`
    return this.acessToken
}

/** Faz uma requisição para a API do MAL para descobrir se os tokens estão corretos */
export async function checkConnection(this: MalApi): Promise<boolean>{
    try{
        await api.get('/users/@me')
        return true
    }catch(error){
        printError("checkConnection()", error)
        return false
    }
}

/** Imprime no console todos os tokens */
export function printTokens(this: MalApi){
    console.log("--------------- tokens ----------------")
    console.log("Auth Code:", this.authCode, "\n")
    console.log("Acess Token:", this.acessToken, "\n")
    console.log("Refresh Token:", this.refreshToken, "\n")
    console.log("Code Challenge:", this.codeChallenge, "\n")
    console.log("Code Verifier:", this.codeVerifier, "\n")
    console.log("---------------------------------------")
}
