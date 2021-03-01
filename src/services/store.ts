import * as SecureStore from 'expo-secure-store'

export type possibleSecureValues =
    "authCode" |
    "acessToken" |
    "refreshToken" |
    "codeChallenge" |
    "codeVerifier"

export async function getValue(key: possibleSecureValues){
    return await SecureStore.getItemAsync(key)
}

export async function setValue(key: possibleSecureValues, value: string){
    return await SecureStore.setItemAsync(key, value)
}
