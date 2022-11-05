import { useRouter } from "next/router";

import { client } from '../../lib/apollo';
import { gql } from "@apollo/client";

import Layout from '@components/Layout';

import Image from 'next/image';

export default function SlugPage({ post }: { post: any }) {
    const router = useRouter();

    return (
        <>
            <Layout>

                <Image src={post?.featuredImage?.node?.sourceUrl} alt="games" className="w-full h-80 object-center object-cover" width={2000} height={100} objectFit="contain" />
                {/* <img className="w-full" src="https://cdn.tuk.dev/assets/components/111220/Blg-6/blog(2).png" alt="games" /> */}
                <div className="py-2 px-4 w-full flex justify-between bg-gray-700">
                    <p className="text-sm text-white font-semibold tracking-wide">Bruce Wayne</p>
                    <p className="text-sm text-white font-semibold tracking-wide">13TH Oct, 2020</p>
                </div>

                <div className="container w-full md:max-w-3xl mx-auto pt-20">
                    <div className="w-full px-4 md:px-6 text-lg text-gray-500 leading-normal">
                        <div className="font-sans">
                            <p className="text-base md:text-sm text-gray-500 font-bold">&lt; <span onClick={() => router.back()} className="text-base md:text-sm text-gray-500 font-bold no-underline hover:underline cursor-pointer">BACK TO BLOG</span></p>
                            <div className="bg-white py-4 rounded-bl-3xl rounded-br-3xl">
                                <h1 className="text-lg text-gray-900 font-semibold tracking-wider">{post?.title}</h1>

                            </div>
                        </div>
                        <article dangerouslySetInnerHTML={{ __html: post.content }}>
                        </article>
                    </div>
                </div>
            </Layout>
        </>
    )
}


export async function getStaticPaths() {
    const paths: any[] = []
    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps({ params }: { params: any; }) {

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
        featuredImage {
              node {
                sourceUrl
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
