import { GetServerSideProps } from 'next'
import type { NextPage } from 'next'
import Grid from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
import { getLikedArtwork } from '../../utils/preRenderFuncs';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { UserData } from '../../utils/checkUser';
import {api} from '../../utils/keys'
import { useRecoilValue } from 'recoil';
import { userDataAtom } from '../../atoms/userAtoms';
import LikedArtworks from '../../components/LikedArtworks';
import { LikedListRes } from '../../utils/interfaces';

const userReq = async (id: string): Promise<UserData | undefined> => {
    const res = await fetch(`http://${api}/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(id)
    }) 
    
    const currentUsereData: UserData = await res.json()
    return currentUsereData
}


const Account: NextPage<{data: LikedListRes}> = ({data}: {data: LikedListRes}) => {

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
    }, [user])


    return (
        <Grid container spacing={2}>
            <Grid xs={1} sm={1} md={1} lg={2}></Grid>
            <Grid xs={10} sm={10} md={10} lg={8}>
                {user && <Box sx={{margin: 'auto'}}>
                    {accountHolderData && userID === accountHolderData.ID.toString() 
                    ?
                        <div>
                            <h1>Welcome {user.username} !</h1>
                            <h2>Recently Liked</h2>
                            <LikedArtworks data={data} userID={userID} />
                        </div>
                    :
                        <div>
                            <h1>{user.username}'s Acccount</h1>
                            <h2>Recently Liked</h2>
                            <LikedArtworks data={data} userID={userID} />
                        </div>
                    }
                </Box>}
            </Grid>
            <Grid xs={1} sm={1} md={1} lg={2}></Grid>
        </Grid>
    )
}

export default Account

export const getServerSideProps: GetServerSideProps = async (context) => {

    const id = context.params?.id
    const res = await getLikedArtwork(id as string, 0)

    return {
        props: {data: res}
    }


}