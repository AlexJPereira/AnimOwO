export interface anime{
    animeId: number,
    userId: number,
    userName: string,
    date: string,
    upVote: number,
    downVote: number,
    ip: string,
    link: string
}

export interface animeLinksResponse extends anime{
    _id: string,
}
export interface postAnimeResponse extends animeResponse{
    linkId: string
}
export interface animeResponse{
    code: 0 | 1,
    message: string
}
