import { useEffect, useState, useMemo } from "react"
import { useRecoilState } from "recoil"
import { userDataAtom } from "../../atoms/userAtoms"
import { getUser } from "../../utils/checkUser"
import LgNavbar from "./LgNavbar"
import SmNavBar from "./SmNavbar"
import { debounce } from 'lodash';
import styles from '../../styles/Navbar.module.css'

const NavBar = () => {

    const [userData, setUserData] = useRecoilState(userDataAtom)
    const [screenSize, setScreenSize] = useState<number>(576)
    
    const resize = () => setScreenSize(window.innerWidth)
    const handleResize = useMemo(() => debounce(resize, 100), [])

    useEffect(() => {
        setScreenSize(window.innerWidth)

        if (userData === null) {
            (async () => {
                const userData = await getUser()
                setUserData(userData)
            })()
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [userData])


    return (
        <div className={styles.ul_nav}>
            {screenSize >= 576 ? <LgNavbar userData={userData} /> : <SmNavBar userData={userData} />}
        </div>
    )
}

export default NavBar