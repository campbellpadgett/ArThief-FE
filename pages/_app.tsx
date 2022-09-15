import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import {RecoilRoot} from 'recoil'
import type { AppProps } from 'next/app'
import NavBar from '../components/NavBar'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <NavBar />
        <Component {...pageProps} />
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default MyApp

