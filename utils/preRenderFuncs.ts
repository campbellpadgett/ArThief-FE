import { SearchResult, LikedListRes } from "./interfaces"
import { api } from "./keys"

export const preRenderSearch = async (): Promise<SearchResult[]> => {
    const res = await fetch(`http://${api}/search/van%20gogh`).then(async res => {
                const response: SearchResult[] = await res.json()
                return response
        })

        return res
}

export const getLikedArtwork = async (userID: string, page: number | undefined) => {
    if (page === undefined) return 
    
    const res = await fetch(`http://${api}/likedArtwork?page=${page.toString()}&userID=${userID}`).then(async res => {
        const response: LikedListRes = await res.json()
        return response 
    })
    
    return res
}

export const preRenderArtwork = async (artworkID: string) => {
    
    const res = await fetch(`http://${api}/artwork/${artworkID}`).then(async res => {
        const response: SearchResult = await res.json()
        return response 
    })
    
    return res
}