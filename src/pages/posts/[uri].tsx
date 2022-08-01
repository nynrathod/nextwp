import { useRouter } from "next/router";

import { client } from '../../lib/apollo';
import { gql } from "@apollo/client";

import Layout from '@components/Layout';

export default function SlugPage({ post }: { post: any }) {
    const router = useRouter();

    return (
        <>
            <Layout>
                <div className="container w-full md:max-w-3xl mx-auto pt-20">
                    <div className="w-full px-4 md:px-6 text-lg text-gray-500 leading-normal">
                        <div className="font-sans">
                            <p className="text-base md:text-sm text-gray-500 font-bold">&lt; <span onClick={() => router.back()} className="text-base md:text-sm text-gray-500 font-bold no-underline hover:underline cursor-pointer">BACK TO BLOG</span></p>
                            <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">{post.title}</h1>
                        </div>
                        <article dangerouslySetInnerHTML={{ __html: post.content }}>
                        </article>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export async function getServerSideProps({ params }: { params: any; }) {
    const GET_POST = gql`
    query GetPostByURI($id: ID!) {
      post(id: $id, idType: URI) {
        title
        content
        date
        author {
          node {
            firstName
            lastName
          }
        }
      }
    }
  `
    const response = await client.query({
        query: GET_POST,
        variables: {
            id: params.uri
        }
    })
    const post = response?.data?.post
    return {
        props: {
            post
        },

    }
}
