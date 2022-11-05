import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useMutation, gql } from "@apollo/client";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RESET_PASSWORD = gql`
  mutation resetUserPassword(
    $key: String!
    $login: String!
    $password: String!
  ) {
    resetUserPassword(
      input: {
        key: $key
        login: $login
        password: $password
      }
    ) {
      user {
        databaseId
      }
    }
  }
`;

interface Props {
    resetKey: string;
    login: string;
}

export default function SetPasswordForm({ resetKey: key, login }: Props) {
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [clientErrorMessage, setClientErrorMessage] = useState('');
    const [resetPassword, { data, loading, error }] = useMutation(RESET_PASSWORD);
    const wasPasswordReset = Boolean(data?.resetUserPassword);
    const router = useRouter();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const isValid = validate();
        if (!isValid) return

        resetPassword({
            variables: {
                key,
                login,
                password,
            },
        }).catch(error => {
            console.error(error);
        });
    }


    function validate() {
        setClientErrorMessage('');

        const isPasswordLongEnough = password.length >= 5;
        if (!isPasswordLongEnough) {
            setClientErrorMessage('Password must be at least 5 characters.');
            return false;
        }

        const doPasswordsMatch = password === passwordConfirm;
        if (!doPasswordsMatch) {
            setClientErrorMessage('Passwords must match.');
            return false;
        }

        return true;
    }

    (wasPasswordReset ?
        setTimeout(() => {
            router.push('/user/login')
        }, 5000) : ''
    )

    toast.success('Password reset successfully', { toastId: 'restpass', autoClose: 5000 });

    return (

        <>
            {wasPasswordReset ? <ToastContainer /> : ''}
            <div className="2xl:container h-screen m-auto">
                <div hidden role="hidden" className=" inset-0 w-6/12 m-auto bg-white bg-opacity-70 backdrop-blur-xl lg:block"></div>
                <div className="relative h-full m-auto lg:w-6/12">
                    <div className="m-auto py-12 px-6 sm:p-20 xl:w-10/12">
                        <div className="space-y-6">
                            <div className="flex">
                                <svg fill="none" height="20" viewBox="0 0 283 64" xmlns="http://www.w3.org/2000/svg" className="m-auto"><path d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z" fill="black"></path></svg>
                            </div>
                            <p className="font-medium text-lg text-gray-700 text-center py-3">Welcome to Vercel | Reset Password</p>
                        </div>
                        <form method="post" onSubmit={handleSubmit} className="signup-form space-y-6 py-6">
                            <div>
                                <input
                                    type="password"
                                    value={password}
                                    placeholder="Enter Password"
                                    className="w-full py-3 px-6 ring-1 ring-gray-300 focus:outline-none focus:ring-gray-900 rounded-lg placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 focus:invalid:ring-red-400 focus:invalid:outline-none"
                                    onChange={event => setPassword(event.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    value={passwordConfirm}
                                    placeholder="Confirm Password"
                                    className="w-full py-3 px-6 ring-1 ring-gray-300 focus:outline-none focus:ring-gray-900 rounded-lg placeholder-gray-600 bg-transparent transition disabled:ring-gray-200 disabled:bg-gray-100 disabled:placeholder-gray-400 focus:invalid:ring-red-400 focus:invalid:outline-none"
                                    onChange={event => setPasswordConfirm(event.target.value)}
                                    required
                                />
                            </div>

                            {clientErrorMessage ? (
                                <p className="error-message">{clientErrorMessage}</p>
                            ) : null}
                            {error ? (
                                <p className="error-message">{error.message}</p>
                            ) : null}
                            <div>
                                <button type="submit" disabled={loading} className="w-full px-6 py-3 rounded-lg bg-gray-800 transition hover:bg-gray-900 focus:bg-gray-800 active:bg-gray-800">
                                    <span className="font-semibold text-white text-lg">
                                        {loading ? <span><svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#aaa" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" /></svg>Saving...</span> : 'Save Password'}</span>
                                </button>
                                <div role="hidden" className="mt-12 border-t">
                                    <span className="block w-max mx-auto -mt-3 px-4 text-center text-gray-500 bg-white">Or</span>
                                </div>
                                <div className="flex justify-center">
                                    <Link href="/user/login" className="text-center inline-block pt-5 underline text-sm tracking-wide text-gray-800 mr-5">Sign In
                                    </Link>
                                    <Link href="/user/signup" className="text-center inline-block pt-5 underline text-sm tracking-wide text-gray-800">Sign Up
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >

        </>

    );
}
