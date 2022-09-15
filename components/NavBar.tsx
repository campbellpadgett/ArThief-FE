import { Button } from "@mui/material"
import Link from "next/link"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { userDataAtom } from "../atoms/userAtoms"
import { getUser } from "../utils/checkUser"
import LogoutButton from "./LogoutButton"








const NavBar = () => {

    const [userData, setUserData] = useRecoilState(userDataAtom)

    useEffect(() => {

        if (userData === null) {
            (async () => {
                const userData = await getUser()
                setUserData(userData)
            })()
        }

    }, [userData])

    return (
        <div>
            {userData 
                ? 
                <LogoutButton />
                : 
                <Link href={'/login'}>
                    <Button variant='contained' color='primary'>Login</Button> 
                </Link> }


            <Link href={'/sign-up'}>
                <Button variant='contained' color='success'>Sign Up</Button>
            </Link>
            <Link href={'/search'}>
                <Button variant='outlined' color='info'>Search</Button>
            </Link>
        </div>
    )
}

export default NavBar