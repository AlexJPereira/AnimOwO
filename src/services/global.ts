import MalApi from './mal-api'
import { userResponse } from './mal-api/interfaces'

export var malApi: MalApi

export function setMalApi(newApi: MalApi){
    malApi = newApi
}

export var user: userResponse

export function setCachedUser(newUser: userResponse){
    user = newUser
}