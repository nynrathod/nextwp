import '../styles/globals.css'
import '../styles/custom.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client/react'
import { AuthProvider } from "@hooks/useAuth";
import { client } from '../lib/apollo'

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