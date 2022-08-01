import React, { ReactNode } from "react";
import Head from "next/head";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <Head>
                <title>Headless WP App</title>
            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
