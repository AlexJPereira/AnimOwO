import { printError } from '../error'
import api from './axios'
import MalApi from './'
import { stringify } from 'querystring'

/** Retorna algumas informações do usuário */
export async function getUserProfileInfo(this: MalApi){
    try{
        const response = await api.get('/users/@me')
        const user = response.data as userResponse
        return user
    }catch(error){
        printError("getUserProfileInfo()", error)
        return undefined
    }
}

/**
 * Retorna a lista específica do usuário
 * @param limit limite máximo é 1000
 */
export async function getUserList(this: MalApi, status: listStatus, sort: listSort, offset?: number, limit?: number){
    try{
        const response = await api.get('/users/@me/animelist',{
            params: {
                status,
                sort,
                offset,
                limit
            }
        })
        const list = response.data as listResponse
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
    console.log(params)
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


export type listStatus = "watching" | "completed" | "on_hold" | "dropped" | "plan_to_watch"
export type listSort = "list_score" | "list_updated_at" | "anime_title" | "anime_start_date"

export type userResponse = {
    "id": string,
    "joined_at": string,
    "location": string,
    "name": string,
    "picture": string
}
export type listResponse = {
    data: animeLessInfo[],
    paging: {
        next: string
    }
}
export type animeLessInfo = {
    node: {
        id: number,
        "main_picture": {
            large: string,
            medium: string
        }
    },
    title: string
}
export type updateAnimeParams = {
    status?: listStatus,
    is_rewatching?: boolean,
    score?: number,
    num_watched_episodes?: number,
    priority?: number,
    num_times_rewatched?: number,
    rewatch_value?: number,
    tags?: string,
    comments?: string
}