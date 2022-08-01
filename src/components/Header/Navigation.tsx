import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

import { useMutation, gql } from "@apollo/client";
import { Popover, Menu, Transition } from "@headlessui/react";
import { IoIosLogIn, IoMdNotificationsOutline } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

import useAuth, { GET_USER } from "@hooks/useAuth";

import styles from "@styles/Home.module.css";

const LOG_OUT = gql`
  mutation logOut {
    logout(input: {}) {
      status
    }
  }
`;

const user = {
    imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const navigation = [
    { name: "Articles", href: "/articles", current: true },
    { name: "About Us", href: "/about-us", current: false },
    { name: "Login", href: "/user/login", current: false },
    { name: "Signup", href: "/user/signup", current: false },
    { name: "Contact Us", href: "/contact-us", current: false },
];

const userNavigation = [
    { name: "Your Profile", href: "/user/profile" },
    { name: "Settings", href: "#" },
];

export default function Navigation() {

    const { loggedIn } = useAuth();

    const [logOut, { called, loading, error, data }] = useMutation(LOG_OUT, {
        refetchQueries: [{ query: GET_USER }],
    });

    // useEffect(() => {
    //     logOut();
    // }, [logOut]);

    function handleSignOut(e: any) {
        e.preventDefault();
        logOut();
    }

    return (
        <>
            <header className="main-header sticky top-0 z-50">
                <Popover className="relative bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex-shrink-0">
                                <Link href="/">
                                    <a> <svg
                                        fill="none"
                                        height="20"
                                        viewBox="0 0 283 64"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z"
                                            fill="rgb(209 213 219"
                                        ></path>
                                    </svg></a>
                                </Link>
                            </div>
                            <div className="-mr-2 -my-2 md:hidden">
                                <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open menu</span>
                                    <HiOutlineMenuAlt3 className="h-6 w-6" aria-hidden="true" />
                                </Popover.Button>
                            </div>

                            <Popover.Group as="nav" className="hidden md:flex space-x-10">
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {navigation.map((item) => (
                                            <Link href={item.href} key={item.name}>
                                                <a
                                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                                >
                                                    {item.name}
                                                </a>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </Popover.Group>

                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">
                                    <button
                                        type="button"
                                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <IoMdNotificationsOutline className="h-6 w-6" />
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="ml-3 relative">

                                        <div>
                                            <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                <span className="sr-only">Open user menu</span>
                                                {loading ? <span><svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#aaa" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="white" /></svg></span> :
                                                    <>{loggedIn ?
                                                        <div
                                                            style={{
                                                                position: "relative",
                                                                width: "30px",
                                                                height: "30px",
                                                                maxHeight: "30px",
                                                                maxWidth: "100%",
                                                            }}
                                                        >
                                                            <Image
                                                                src={user.imageUrl}
                                                                alt="Cloudflare Logo"
                                                                className="h-8 w-8 rounded-full"
                                                                width="100%" height="100%" layout="fill" objectFit="contain"
                                                            />
                                                        </div>
                                                        :
                                                        <Link href="/user/login">
                                                            <a
                                                                type="button"
                                                                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white text-2xl"
                                                            ><IoIosLogIn /></a>
                                                        </Link>
                                                    }</>}

                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {userNavigation.map((item) => (
                                                    <Link href={item.href} key={item.name}>
                                                        <a
                                                            className="block px-4 py-2 text-sm text-gray-700"
                                                        >
                                                            {item.name}
                                                        </a>
                                                    </Link>
                                                ))}
                                                <Link href={""}>
                                                    <a
                                                        className="block px-4 py-2 text-sm text-gray-700"
                                                        onClick={handleSignOut}
                                                    >
                                                        Sign out
                                                    </a>
                                                </Link>
                                            </div>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="duration-200 ease-out"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="duration-100 ease-in"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Popover.Panel
                            focus
                            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                        >
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-gray-800 divide-y-2 divide-gray-50">
                                <div className="pt-5 pb-6 px-5">
                                    <div className="flex items-center justify-between">
                                        <span className={styles.logo}>
                                            <svg
                                                fill="none"
                                                height="20"
                                                viewBox="0 0 283 64"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z"
                                                    fill="rgb(209 213 219"
                                                ></path>
                                            </svg>
                                        </span>
                                        <div className="-mr-2">
                                            <Popover.Button className="bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none  focus:ring-white-500">
                                                <span className="sr-only">Close menu</span>
                                                <IoCloseOutline className="h-6 w-6" aria-hidden="true" />
                                            </Popover.Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative grid gap-3 bg-gray-800 px-5 py-6 sm:gap-8 sm:p-8">
                                    {navigation.map((item) => (
                                        <Link href={item.href} key={item.name}>
                                            <a
                                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                            >
                                                {item.name}
                                            </a>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </Popover>
            </header >
        </>
    );
}
