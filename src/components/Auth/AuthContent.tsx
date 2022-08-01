import { useEffect, ReactNode } from "react";
import { useRouter } from "next/router";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import useAuth from "@hooks/useAuth";

export default function AuthContent({ children }: { children: ReactNode }) {
    const { loggedIn, loading } = useAuth();
    const router = useRouter();

    // Navigate unauthenticated users to Log In page.
    useEffect(() => {
        if (!loading && !loggedIn) {
            router.push('/user/login');
        }
    }, [loggedIn, loading, router]);

    if (loggedIn) {
        return <>{children}</>;
    }

    return (
        <>
            <div className="relative h-full m-auto lg:w-6/12">
                <div className="m-auto py-12 px-6 sm:p-20 xl:w-10/12 text-center">
                    <Skeleton height={50} count={5} className="my-3" />
                </div>
            </div>
        </>
    );
}
