import MalApi from './mal-api'

export var malApi: MalApi

export function setMalApi(newApi: MalApi){
    malApi = newApi
}
