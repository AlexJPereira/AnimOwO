import api from './axios'
import {
    postAnimeParams, editAnimeParams, VoteType,
    getAnimeResponse, postAnimeResponse, editAnimeResponse, deleteAnimeResponse, voteAnimeResponse, recommendationResponse
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

export async function getAnimeLinks(animeId: number, episode?: number, userId?: number){
    const response = await api.get(`/link/`, {
        params: {
            id: animeId,
            episode: episode,
            userId: userId
        }
    })
    const links = response.data as getAnimeResponse[]
    return links
}

export async function postAnimeLink(anime: postAnimeParams){
    const header = await getHeaderToken()
    if(!header)
        return
    
    const response = await api.post(`/link/`, anime, header)
    return response.data as postAnimeResponse
}

export async function editAnimeLink(databaseId: string, anime: editAnimeParams){
    const header = await getHeaderToken()
    if(!header)
        return

    const response = await api.put(`/link/${databaseId}/`, anime, header)
    return response.data as editAnimeResponse
}

export async function deleteAnimeLink(databaseId: string, userId: number){
    const header = await getHeaderToken()
    if(!header)
        return

    const response = await api.delete(`/link/${databaseId}/`, {
        ...header,
        params: {
            userId: userId
        }
    })
    return response.data as deleteAnimeResponse
}

export async function vote(type: VoteType, userId: number, linkId: string){
    const header = await getHeaderToken()
    if(!header)
        return

    const response = await api.put('/vote/',{
        userId: userId,
        linkId: linkId,
        type: type
    }, header)
    return response.data as voteAnimeResponse
}

export async function getRecommendations(userId: number){
    const header = await getHeaderToken()
    if(!header)
        return
    
    const response = await api.get(`/recommendation/${userId}`, header)
    return response.data as recommendationResponse
}



async function test(){
    const userId = 4811263 // Wykke
    const animeId = 40571 // Majo no Tabitabi  4073
    
    const resp = await getRecommendations(userId)
    console.log(resp)
}

//test()
