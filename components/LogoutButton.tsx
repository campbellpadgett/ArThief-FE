import { Button } from "@mui/material"
import { useSetRecoilState } from "recoil"
import { userDataAtom } from "../atoms/userAtoms"
import {api} from '../utils/keys'

const LogoutButton = () => {

    const setUserData = useSetRecoilState(userDataAtom)

    const signOut = async () => {
        const res = await fetch(`http://${api}/logout`, {
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