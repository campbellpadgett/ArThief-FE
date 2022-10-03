import { SearchResults } from "../pages/search"
import { api } from "./keys"
import { SearchResult } from "../components/ArtCard"

export const preRenderSearch = async (): Promise<SearchResults> => {
    const res = await fetch(`http://${api}/search/van%20gogh`).then(async res => {
                const response: SearchResults = await res.json()
                return response
        })

        return res
}
