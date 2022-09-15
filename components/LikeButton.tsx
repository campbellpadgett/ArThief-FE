import FavortieIcon from '@mui/icons-material/Favorite'
import FavoriteOutline from '@mui/icons-material/FavoriteBorderOutlined'
import { Button } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { userDataAtom } from '../atoms/userAtoms'
import { LikeData, LikeRequest } from '../pages/artwork/[id]'


interface LikeButtonProps {
    likeData: LikeData
    likeHandler: (likedStatus: boolean, setStatus: Dispatch<SetStateAction<boolean>>, likeData: LikeData) => Promise<void>
    likeReq: (ld: LikeData) => Promise<LikeRequest | undefined>
}

const LikeButton = (props: LikeButtonProps) => {

    const [liked, setLiked] = useState(false)
    const userData = useRecoilValue(userDataAtom)

    useEffect(() => {
        (async () => {
            const res = await props.likeReq(props.likeData)
            if (res?.exist && res.data) setLiked(res.liked)
        })()
    })

    return (
        <Button onClick={() => props.likeHandler(liked, setLiked, props.likeData)}>
            {liked && userData ? <FavortieIcon color='error' /> : <FavoriteOutline color='error' />}
        </Button>
    )
}

export default LikeButton