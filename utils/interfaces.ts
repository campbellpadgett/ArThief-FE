import { UserData } from './checkUser'

export interface LikeData {
    // item can be either artwork, curation, ot other entity
    itemID: string | undefined
    userID: number | undefined
    likeStatus: boolean
}

export interface LikeRequest {
    data: null | LikeData
    liked: boolean
    exist: boolean
}

export interface SearchResult {
    id: string
    Title: string
    Artist_Name: string
    DOR: string
    Description: string
    Source: string
    Abb: string
    IMG: string
    IMG_S: string | null
}

// useQuery.query needs a type instead of an interface. 
export type QuerySearchResult = {
    id: string
    Title: string
    Artist_Name: string
    DOR: string
    Description: string
    Source: string
    Abb: string
    IMG: string
    IMG_S: string | null
}

export interface ArtCardProps {
    result: QuerySearchResult
    cardSize: number
}

export interface TakenUsernames { 
    [key: string]: boolean 
}

export interface SignUpData {
    email: null | string
    password: null | string
    username: null | string 
}

export interface LoginData {
    password: null | string
    username: null | string 
}

export interface NavProps {
    userData: UserData | null
}

export interface RequestError {
    error: boolean
    errorMsg: string
}

export interface LikedListRes {
    liked_artwork: SearchResult[] | undefined
    page: number
    count: number
}
