import { Button } from "@mui/material"
import { useSetRecoilState } from "recoil"
import { userDataAtom } from "../atoms/userAtoms"

const LogoutButton = () => {

    const setUserData = useSetRecoilState(userDataAtom)

    const signOut = async () => {
        const res = await fetch(`http://${process.env.NEXT_PUBLIC_SERVER_URL}/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
        })

        setUserData(null)
    }

    return (
        <Button variant='contained' color='error' onClick={signOut}>Log Out</Button>
    )
}

export default LogoutButton