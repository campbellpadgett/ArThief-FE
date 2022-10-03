import { SearchResults } from "./interfaces"
import { api } from "./keys"

export const preRenderSearch = async (): Promise<SearchResults> => {
    const res = await fetch(`http://${api}/search/van%20gogh`).then(async res => {
                const response: SearchResults = await res.json()
                return response
        })

        return res
}
