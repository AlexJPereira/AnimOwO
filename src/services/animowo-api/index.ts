import api from './axios'
import {
    postAnimeParams, editAnimeParams,
    getAnimeResponse, postAnimeResponse, editAnimeResponse, deleteAnimeResponse
} from './interfaces'
import * as Store from '../store'

async function getHeaderToken(){
    const token = await Store.getValue('acessToken')
    if(!token)
        return undefined

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export async function getAnimeLinks(animeId: number, episode?: number){
    const response = await api.get(`/`, {
        params: {
            id: animeId,
            episode: episode
        }
    })
    const links = response.data as getAnimeResponse[]
    return links
}

export async function postAnimeLink(anime: postAnimeParams){
    const header = await getHeaderToken()
    if(!header)
        return
    
    const response = await api.post(`/`, anime, header)
    return response.data as postAnimeResponse
}

export async function editAnimeLink(databaseId: string, anime: editAnimeParams){
    const header = await getHeaderToken()
    if(!header)
        return

    const response = await api.put(`/${databaseId}/`, anime, header)
    return response.data as editAnimeResponse
}

export async function deleteAnimeLink(databaseId: string, userId: number){
    const header = await getHeaderToken()
    if(!header)
        return

    const response = await api.delete(`/${databaseId}/`, {
        ...header,
        params: {
            userId: userId
        }
    })
    return response.data as deleteAnimeResponse
}

async function test(){
    const userId = 4811263 // Wykke
    const animeId = 40571 // Majo no Tabitabi  4073
    
    //const response = await getAnimeLinks(animeId)
    //const response = await deleteAnimeLink('6057aee6badad53d55a05717', userId)
    // const response = await postAnimeLink({
    //     animeId,
    //     link: 'http://youtube.com/1',
    //     numEpisode: 1,
    //     userId
    // })

    //console.log(response)
}

//test()
