import internal from "stream"























export interface UserData {
    ID: number 
    username: string
    email: string
    password : string 
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: null | string
}

export const getUser = async (): Promise<UserData | null> => {
    const res = await fetch(`http://${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
            method: 'GET',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        }) 

    if (res.status !== 200) return null

    const userData: UserData = await res.json()
    return userData
}






