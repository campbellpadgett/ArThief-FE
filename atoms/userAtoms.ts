




















import {atom} from 'recoil'
import { UserData } from '../utils/checkUser'

export const userDataAtom = atom<UserData | null>({
    key: 'userData',
    default: null
})