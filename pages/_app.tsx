import '../styles/globals.css'
import {RecoilRoot} from 'recoil'
import type { AppProps } from 'next/app'
import NavBar from '../components/Navbar/NavBar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <RecoilRoot>
        <NavBar />
        <Component {...pageProps} />
      </RecoilRoot>
  )
}

export default MyApp

