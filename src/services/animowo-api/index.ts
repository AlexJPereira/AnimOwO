import api from './axios'
import {
    postAnimeParams, editAnimeParams,
    getAnimeResponse, postAnimeResponse, editAnimeResponse, deleteAnimeResponse
} from './interfaces'
//import * as Store from '../store'

async function getHeaderToken(){
    //const token = await Store.getValue('acessToken')
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjViZWVhODMwOGM5MmUzMzkwYzU2MjQ2NTcxNjZkMzJkYjNkMjRjMDNjZWU1ZDg3YjAxNThjNWM0ZWU4NGFkNTFmNmNkY2Q3OTgxY2FmMTg0In0.eyJhdWQiOiIzOGExYWQxMjM5NTJhZmFjNzJmYTg3YTZmYTA1ZDNkNiIsImp0aSI6IjViZWVhODMwOGM5MmUzMzkwYzU2MjQ2NTcxNjZkMzJkYjNkMjRjMDNjZWU1ZDg3YjAxNThjNWM0ZWU4NGFkNTFmNmNkY2Q3OTgxY2FmMTg0IiwiaWF0IjoxNjE1ODQ3MDY3LCJuYmYiOjE2MTU4NDcwNjcsImV4cCI6MTYxODUyNTQ2Nywic3ViIjoiNDgxMTI2MyIsInNjb3BlcyI6W119.Gm1ur0Wk1qwtb4o-K3XnIfe6NqcBFOezt9oTwsUhblthjZZnmBaENuXuk3SsUp3os1ei4wzthr7zwH6F8GvmGa9kLxAqGTgnldxY2LWwHXDjj5Ik0WRkiECD9eo31H-nNNc9ooSOPL7L71OYHI9Lv7RkcqTmD_tMFL9JQxr2ixUnK2k321eiS2w1KPbQ-4zQ8LvG1Xcuc7jRwRoJs9WEciprc7zO-bl2pAkbaNi1bpxkIzHWGc0G1q846-E_RkzNPqI_1xTklX-y_F6agMM1BhVleXl5kgKWbbYTTMvYJtoo__7qiZ8V42g_swEwBFT1CXYatfCMtmyPXVgK0spuMQ"
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

export async function editAnimeLink(databaseId: number, anime: editAnimeParams){
    const header = await getHeaderToken()
    if(!header)
        return

    const response = await api.put(`/${databaseId}`, anime, header)
    return response.data as editAnimeResponse
}

export async function deleteAnimeLink(databaseId: string){
    const header = await getHeaderToken()
    if(!header)
        return

    const response = await api.delete(`/${databaseId}`, header)
    return response.data as deleteAnimeResponse
}

async function test(){
    const userId = 4811263

}

test()
