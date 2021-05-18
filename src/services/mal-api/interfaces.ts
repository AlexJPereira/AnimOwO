/* ENUMERATOR */
export type listStatus = "watching" | "completed" | "on_hold" | "dropped" | "plan_to_watch"
export type listSort = "list_score" | "list_updated_at" | "anime_title" | "anime_start_date"
export type rankingType = "all" | "airing" | "upcoming" | "tv" | "ova" | "movie" | "special" | "bypopularity" | "favorite"
export type animeSeason = "winter" | "spring" | "summer" | "fall"
export type seasonalSort = "anime_score" | "anime_num_list_users"

/* RESPONSES */
export type userResponse = {
    "anime_statistics": {
        "mean_score": number,
        "num_days": number,
        "num_days_completed": number,
        "num_days_dropped": number,
        "num_days_on_hold": number,
        "num_days_watched": number,
        "num_days_watching": number,
        "num_episodes": number,
        "num_items": number,
        "num_items_completed": number,
        "num_items_dropped": number,
        "num_items_on_hold": number,
        "num_items_plan_to_watch": number,
        "num_items_watching": number,
        "num_times_rewatched": number,
    },
    "id": number,
    "is_supporter": boolean,
    "joined_at": string,
    "location": string,
    "name": string,
    "picture": string,
    "time_zone": string,
}
export type genericListResponse = {
    data: genericAnimeNode[],
    paging: {
        next: string
    }
}
export type seasonalListResponse = {
    data: { node: animeDetailsResponse }[],
    paging: {
        next: string
    },
    season: {
        season: string,
        year: number
    }
}
export type rankingListResponse = {
    data: rankingNode[],
    paging: {
        next: string
    }
}
export type userListResponse = {
    data: { node: animeDetailsResponse }[],
    paging: { next: string }
}
export type animeDetailsResponse = {
    "alternative_titles": {
      "en": string,
      "ja": string,
      "synonyms":  string[],
    },
    "average_episode_duration": number,
    "background": string,
    "broadcast": {
      "day_of_the_week": string,
      "start_time": string,
    },
    "created_at": string,
    "end_date": string,
    "genres": {
        "id": number,
        "name": string
    }[],
    "id": number,
    "main_picture": {
      "large": string,
      "medium": string,
    },
    "mean": number, //pontuacao media
    "media_type": string,
    "my_list_status": {
      "is_rewatching": boolean,
      "num_episodes_watched": number,
      "score": number,
      "status": listStatus,
      "updated_at": string,
    } | undefined,
    "nsfw": string,
    "num_episodes": number,
    "num_list_users": number,
    "num_scoring_users": number,
    "pictures": {
        "large": string,
        "medium": string
    }[],
    "popularity": number,
    "rank": number,
    "rating": string,
    "recommendations": {
        "node": genericAnimeNode,
        "num_recommendations": number
    }[],
    "related_anime": {
        "node": genericAnimeNode,
        "relation_type": string,
        "relation_type_formatted": string,
    }[],
    "related_manga": {
        "node": genericAnimeNode,
        "relation_type": string,
        "relation_type_formatted": string,
    }[],
    "source": string,
    "start_date": string,
    "start_season": {
      "season": string,
      "year": number,
    },
    "statistics": {
      "num_list_users": number,
      "status": {
        "completed": string,
        "dropped": string,
        "on_hold": string,
        "plan_to_watch": string,
        "watching": string,
      },
    },
    "status": string,
    "studios": {
        "id": number,
        "name": string
    }[],
    "synopsis": string,
    "title": string,
    "updated_at": string,
}
export const animeDetailsInitialValues: animeDetailsResponse = {
    alternative_titles: {en: "", ja: "", synonyms: []},
    average_episode_duration: 0,
    background: "",
    broadcast: {day_of_the_week: "", start_time: ""},
    created_at: "",
    end_date: "",
    genres: [],
    id: 0,
    main_picture: {large: "", medium: ""},
    mean: 0,
    media_type: "",
    my_list_status: undefined,
    nsfw: "",
    num_episodes: 0,
    num_list_users: 0,
    num_scoring_users: 0,
    pictures: [],
    popularity: 0,
    rank: 0,
    rating: "",
    recommendations: [],
    related_anime: [],
    related_manga: [],
    source: "",
    start_date: "",
    start_season: {season: "", year: 0},
    statistics: {
        num_list_users: 0,
        status: {
            completed: "",
            dropped: "",
            on_hold: "",
            plan_to_watch: "",
            watching: "",
        },
    },
    status: "",
    studios: [],
    synopsis: "",
    title: "",
    updated_at: "",
}

/* NODES */
export type genericAnimeNode = {
    node: {
        id: number,
        "main_picture": {
            large: string,
            medium: string
        }
        title: string
    },
}
export type rankingNode = {
    node: animeDetailsResponse,
    ranking: {
      "rank": number,
    },
}

/* PARAMS */
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
export const userFields = [
    "id",
    "name",
    "picture",
    "gender",
    "birthday",
    "location",
    "joined_at",
    "anime_statistics",
    "time_zone",
    "is_supporter",
]
export const animeFields = [
    "id",
    "title",
    "main_picture",
    "alternative_titles",
    "start_date",
    "end_date",
    "synopsis",
    "mean",
    "rank",
    "popularity",
    "num_list_users",
    "num_scoring_users",
    "nsfw",
    "genres",
    "created_at",
    "updated_at",
    "media_type",
    "status",
    "my_list_status",
    "num_episodes",
    "start_season",
    "broadcast",
    "source",
    "average_episode_duration",
    "rating",
    "studios",
    "pictures",
    "background",
    "related_anime",
    "related_manga",
    "recommendations",
    "statistics"
]


