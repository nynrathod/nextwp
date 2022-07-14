import '../../styles/index.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client/react'
import { client } from '../lib/apollo'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default MyApp