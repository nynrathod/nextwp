import type { AppProps } from 'next/app'

import { ApolloProvider } from '@apollo/client/react'
import { client } from '../lib/apollo'
import { AuthProvider } from "@hooks/useAuth";

import '../styles/globals.css'
import '../styles/custom.css'


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </ApolloProvider>
    )
}

export default MyApp