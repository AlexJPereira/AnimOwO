import api from './axios'
import {
    postAnimeParams, editAnimeParams, VoteType,
    getAnimeResponse, postAnimeResponse, editAnimeResponse, deleteAnimeResponse, voteAnimeResponse, recommendationResponse, getFavoriteListResponse
} from './interfaces'
import * as Store from '../store'
import { user } from '../global'

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

export async function getFavorites(userId: number){
    const header = await getHeaderToken()
    if(!header)
        return
    
    const response = await api.get(`/favorite/${userId}`, header)
    return response.data as getFavoriteListResponse
}

export async function postFavorite(userId: number, animeId: number){
    const header = await getHeaderToken()
    if(!header)
        return
    
    const response = await api.post(`/favorite/`, {
        userId,
        animeId
    }, header)
    return response.data ? true : false
}

export async function deleteFavorite(userId: number, animeId: number){
    const header = await getHeaderToken()
    if(!header)
        return
    
    const response = await api.delete(`/favorite/`, {
        ...header,
        data: {
            userId,
            animeId
        }
    })
    return response.data ? true : false
}


async function test(){
    const userId = 4811263 // Wykke
    const animeId = 40571 // Majo no Tabitabi  4073
    
    //const resp = await postFavorite(userId, 123456)
    const resp = await getFavorites(userId)
    //const resp = await deleteFavorite(userId, 123456)
    console.log(resp)
}

//test()
