import { printError } from '../error'
import api from './axios'
import MalApi from './'
import { stringify } from 'querystring'
import {
    userResponse, genericListResponse, userListResponse,
    listStatus, listSort, updateAnimeParams, userFields, animeFields
} from './interfaces'

/** Retorna algumas informações do usuário */
export async function getUserProfileInfo(this: MalApi){
    try{
        const response = await api.get('/users/@me', {
            params: {
                fields: userFields.toString()
            }
        })
        const user = response.data as userResponse
        return user
    }catch(error){
        printError("getUserProfileInfo()", error)
        return undefined
    }
}

/**
 * Retorna a lista específica do usuário
 * @param limit Valor máximo é 1000
 */
export async function getUserList(this: MalApi, status: listStatus, sort: listSort, user: string = '@me', offset?: number, limit?: number){
    try{
        const response = await api.get(`/users/${user}/animelist`,{
            params: {
                status,
                sort,
                offset,
                limit,
                fields: animeFields.toString()
            }
        })
        const list = response.data as userListResponse
        return list
    }catch(error){
        printError("getUserList()", error)
        return undefined
    }
}

/**
 * Faz o update de um anime na lista
 * @param score Número de 0 a 10
 * @param priority Número de 0 a 2
 * @param rewatch_value Número de 0 a 5
 */
export async function updateAnimeInfo(this: MalApi, id: number, params: updateAnimeParams){
    try{
        const response = await api.put(`/anime/${id}/my_list_status`, stringify(params), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        const animeUpdated = response.data as updateAnimeParams
        return animeUpdated
    }catch(error){
        printError("updateAnimeInfo()", error)
        return undefined
    }
}

/** Deleta um anime da lista do usuário */
export async function deleteAnimeFromList(this: MalApi, id: number){
    try{
        const response = await api.delete(`/anime/${id}/my_list_status`)
        return true
    }catch(error){
        printError("deleteAnimeFromList()", error)
        return false
    }
}
