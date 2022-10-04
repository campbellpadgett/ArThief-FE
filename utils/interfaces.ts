import { Dispatch, SetStateAction } from 'react'
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

export type SearchResults = {
    id: string
    Title: string
    Artist_Name: string
    DOR: string
    Description: string
    Source: string
    Abb: string
    IMG: string
    IMG_S: string | null 
}[]

export interface ListProps {
    results: SearchResults | undefined
    cols: number
}

export interface LikeButtonProps {
    likeData: LikeData
    likeHandler: (likedStatus: boolean, setStatus: Dispatch<SetStateAction<boolean>>, likeData: LikeData) => Promise<void>
    likeReq: (ld: LikeData) => Promise<LikeRequest | undefined>
}

export type SearchResult = {
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
    result: SearchResult
}

export interface TakenUsernames { 
    [key: string]: boolean 
}

export interface FormProps {
    usernames: TakenUsernames
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