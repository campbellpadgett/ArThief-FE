import { Button } from "@mui/material"
import Link from "next/link"
import LogoutButton from "../LogoutButton"
import styles from '../../styles/Navbar.module.css'
import { NavProps } from "../../utils/interfaces"

const LgNavbar = (props: NavProps) => {
    return (
        <ul className={styles.ul_nav}>
                {!props.userData 
                ?
                    <li className={styles.li_nav}>
                        <Link href={'/sign-up'}>
                            <Button variant='outlined' color='success'>Sign Up</Button>
                        </Link>
                    </li>
                : null}
    
                <li className={styles.li_nav}>
                    {props.userData 
                    ? 
                    <LogoutButton />
                    : 
                    <Link href={'/login'}>
                        <Button variant='outlined' color='inherit'>Login</Button> 
                    </Link> }
                </li>

                {props.userData
                ?
                <li className={styles.li_nav}>
                    <Link href={`/account/${props.userData.ID.toString()}`}>
                        <Button variant='outlined' color='primary'>Account</Button>
                    </Link>
                </li>
                : null}
    
                <li className={styles.li_nav}>
                    <Link href={'/search'}>
                        <Button variant='outlined' color='inherit'>Search</Button>
                    </Link>
                </li>
                
                {props.userData 
                ? 
                <li className={styles.li_nav}>
                    <Link href={`/account/${props.userData.ID}`}>
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

export default LgNavbar