import { useQuery, gql, ApolloError } from "@apollo/client";
import React, { createContext, useContext, ReactNode } from "react";

export interface User {
    id: string;
    databaseId: number;
    firstName: string;
    lastName: string;
    email: string;
    capabilities: string[];
    onClick: string;
}

interface AuthData {
    loggedIn: boolean;
    user?: User,
    loading: boolean;
    error?: ApolloError;
}

const DEFAULT_STATE: AuthData = {
    loggedIn: false,
    user: undefined,
    loading: false,
    error: undefined,
};

const AuthContext = createContext(DEFAULT_STATE);


export const GET_USER = gql`
  query getUser {
    viewer {
      id
      databaseId
      firstName
      lastName
      email
      capabilities
    }
  }
`;

export const LOG_IN = gql`
  mutation logIn($login: String!, $password: String!) {
    loginWithCookies(input: {
      login: $login
      password: $password
      rememberMe: true
    }) {
      status
    }
  }
`;

export const REGISTER_USER = gql`
  mutation registerUser(
    $email: String!
    $firstName: String!
    $lastName: String!
  ) {
    registerUser(
      input: {
        username: $email
        email: $email
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      user {
        databaseId
      }
    }
  }
`;

export const LOG_OUT = gql`
  mutation logOut {
    logout(input: {}) {
      status
    }
  }
`;

export function AuthProvider({ children }: { children: ReactNode }) {

    const { data, loading, error } = useQuery(GET_USER);

    const user = data?.viewer;
    const loggedIn = Boolean(user);

    const value = {
        loggedIn,
        user,
        loading,
        error,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext);

export default useAuth;
