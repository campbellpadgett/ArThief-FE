import { LikeData } from "./interfaces"
import { Dispatch, SetStateAction } from "react"
import { api } from "./keys"

export const rowSX = {
    padding: '2px',
    borderTop: '5px solid black' 
}

export const renderSource = (source: string, Abb: string) => {
    if (Abb === 'CHI') return `Courtesy of the ${source} from the Art Institute of Chicago`
    
    return `Courtesy of the ${source}`
}

export const likeHandler = async (likedStatus: boolean, setStatus: Dispatch<SetStateAction<boolean>>, likeData: LikeData) => {
    setStatus(!likedStatus)

    const ld: LikeData = {
        itemID: likeData.itemID,
        userID: likeData.userID,
        likeStatus: !likedStatus
    }

    const res = await fetch(`http://${api}/like`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(ld)
    })
}

export const imgSize = (window: number) => {
    if (window >= 1000) return '50%'
    if (window <= 999 && window > 425) return '75%'
    if (window <= 424) return '100%'
}