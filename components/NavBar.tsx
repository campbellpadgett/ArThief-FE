import { Button } from "@mui/material"
import Link from "next/link"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { userDataAtom } from "../atoms/userAtoms"
import { getUser } from "../utils/checkUser"
import LogoutButton from "./LogoutButton"
import styles from '../styles/Navbar.module.css'





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
        <ul className={styles.ul_nav}>

            {!userData 
            ?
                <li className={styles.li_nav}>
                    <Link href={'/sign-up'}>
                        <Button variant='outlined' color='success'>Sign Up</Button>
                    </Link>
                </li>
            : null}

            <li className={styles.li_nav}>
                {userData 
                ? 
                <LogoutButton />
                : 
                <Link href={'/login'}>
                    <Button variant='outlined' color='inherit'>Login</Button> 
                </Link> }
            </li>

            <li className={styles.li_nav}>
                <Link href={'/search'}>
                    <Button variant='outlined' color='inherit'>Search</Button>
                </Link>
            </li>
            
            {userData 
            ? 
            <li className={styles.li_nav}>
                <Link href={`/account/${userData.ID}`}>
                    <Button variant='outlined' color='inherit'>Profile</Button>
                </Link>
            </li>
            : null}

            <li className={styles.li_nav}>
                <Link href={'/about'}>
                    <Button variant='outlined' color='inherit'>About</Button>
                </Link>
            </li>
        </ul>
    )
}

export default NavBar