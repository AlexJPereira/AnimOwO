export interface getAnimeResponse{
    _id: string,
    animeId: number,
    userId: number,
    userName: string,
    date: string,
    upVote: number,
    downVote: number,
    numEpisode: number,
    link: string,
    vote: VoteType | ''
}
export interface postAnimeResponse{
    _id: string,
    code: 0 | 1,
    message: string
}
export interface editAnimeResponse{
    code: 0 | 1,
    message: string
}
export interface deleteAnimeResponse{
    code: 0 | 1,
    message: string
}
export interface voteAnimeResponse{
    code: 0 | 1,
    message: string
}
export interface recommendationResponse{
    _id: string,
    predict_list: number[],
    user_id: number
}

export interface getAnimeParams{}
export interface postAnimeParams{
    animeId: number,
    userId: number,
    numEpisode: number,
    link: string
}
export interface editAnimeParams{
    userId: number,
    link: string
}
export interface deleteAnimeParams{}
export type VoteType = 'up' | 'down'

