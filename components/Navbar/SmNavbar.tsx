import { useState } from "react"
import Link from "next/link"
import LogoutButton from "../LogoutButton"
import styles from '../../styles/Navbar.module.css'
import { NavProps } from "../../utils/interfaces"
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

const SmNavBar = (props: NavProps) => {

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    
    const open = Boolean(anchorEl)

    const clickHandle = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const closeHandler = () => {
        setAnchorEl(null)
    }

    return (
            <div className={styles.ul_nav}>
                <Button
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={clickHandle}
                color="warning"
                variant='outlined'>
                    Menu
                </Button>

                <Menu
                MenuListProps={{
                'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={closeHandler}
                TransitionComponent={Fade}>

                    {!props.userData 
                    ?
                    <MenuItem onClick={closeHandler}>
                        <Link href={'/sign-up'}>
                            <Button variant='outlined' color='success'>Sign Up</Button>
                        </Link>
                    </MenuItem> 
                    : null}

                    {props.userData 
                    ? 
                    <MenuItem onClick={closeHandler}>
                        <LogoutButton />
                    </MenuItem>
                    : 
                    <MenuItem onClick={closeHandler}>
                        <Link href={'/login'}>
                            <Button variant='outlined' color='inherit'>Login</Button> 
                        </Link>
                    </MenuItem>}

                    {props.userData
                    ?
                    <MenuItem onClick={closeHandler}>
                        <Link href={`/account/${props.userData.ID.toString()}`}>
                            <Button variant='outlined' color='primary'>Account</Button>
                        </Link>
                    </MenuItem>
                    : null}

                    <MenuItem onClick={closeHandler}>
                        <Link href={'/search'}>
                            <Button variant='outlined' color='inherit'>Search</Button>
                        </Link>
                    </MenuItem>
                        
                    {/* <MenuItem onClick={closeHandler}>
                        <Link href={`/account/${props.userData.ID}`}>
                            <Button variant='outlined' color='inherit'>Profiles</Button>
                        </Link>
                    </MenuItem> */}

                    <MenuItem onClick={closeHandler}>
                        <Link href={'/about'}>
                            <Button variant='outlined' color='inherit'>About</Button>
                         </Link>
                    </MenuItem>
                </Menu>
            </div>
    )
}

export default SmNavBar