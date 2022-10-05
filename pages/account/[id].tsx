import type { NextPage } from 'next'
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
import Loading from '../../components/Loading';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { UserData } from '../../utils/checkUser';
import {api} from '../../utils/keys'
import { useRecoilValue } from 'recoil';
import { userDataAtom } from '../../atoms/userAtoms';
import LikedArtworks from '../../components/LikedArtworks';

 const userReq = async (id: string): Promise<UserData | undefined> => {
        const res = await fetch(`http://${api}/users`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(id)
        }) 
        
        const currentUsereData: UserData = await res.json()
        return currentUsereData
    }

const Login: NextPage = () => {

    const router = useRouter();
    const query = router.query;
    const userID = query.id as string

    const [user, setUser] = useState<UserData | undefined>(undefined)
    const accountHolderData = useRecoilValue(userDataAtom)

    useEffect(() => {
        (async () => {
            if (accountHolderData && userID == accountHolderData.ID.toString()) {
                setUser(accountHolderData)
                return
            } 

            const res = await userReq(userID)
            if (res) setUser(res)
        })()
    }, [userID])


    return (
        <Grid container spacing={2}>
            <Grid xs={4} sm={4} md={4} lg={4}></Grid>
            <Grid xs={8} sm={8} md={8} lg={8}>


                <Box sx={{margin: 'auto'}}>
                   {user ? 

                   <div>
                        <h1>Welcome {user.username} !</h1>
                        <h2>Recently Liked</h2>
                        <LikedArtworks userID={user.ID} />
                   </div>
                   
                   : <Loading />}
                </Box>


            </Grid>
        </Grid>
    )
}

export default Login