import React, { ReactNode } from "react";
import { client } from '../lib/apollo';
import { gql } from "@apollo/client";

import Layout from "@components/Layout";
import PostCard from "@components/Post/PostCard";
import Link from "next/link";
import { Url } from "url";

export default function Articles({ posts, categories }: { posts: any; categories: any; }) {
    return (
        <>
            {console.log(categories)}
            <Layout>
                <section className="text-gray-600 bg-gray-100 body-font">
                    <div className="container px-5 pt-16 pb-24 mx-auto">
                        <ul className="flex flex-wrap justify-center text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                            <Link href="/articles" className="mr-2 inline-block py-3 px-4 text-white bg-blue-600 rounded-lg active" aria-current="page">Show All
                            </Link>

                            {
                                categories.map((category: {
                                    slug: Url;
                                    name: ReactNode; cid: React.Key | null | undefined;
                                }) => {
                                    return (
                                        // <PostCard key={post.id} post={post}></PostCard>
                                        <Link href={category.slug} key={category.cid} className="mr-2 inline-block py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white">
                                            {category.name}
                                        </Link>
                                    )
                                })
                            }
                        </ul >

                        <div className="pt-10">
                            <h3 className="text-2xl font-semibold mb-2">Coaching</h3>
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                                {
                                    posts.map((post: { id: React.Key | null | undefined; }) => {
                                        return (
                                            <PostCard key={post.id} post={post}></PostCard>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </section >
                {/* <h2>{new Date().getSeconds()}</h2> */}
            </Layout >
        </>
    );
}

export async function getStaticProps() {
    const GET_POSTS = gql`
    query AllPostsQuery {
      posts(first: 1000) {
        nodes {
          title
          date
          uri
          featuredImage {
              node {
                sourceUrl
              }
            }
        }
      }
    }
  `;

    const GET_CATEGORIES = gql`
    query CategoriesQuery {
        categories(where: {exclude: "1"}) {
            nodes {
                name
                slug
            }
        }
    }`;

    const postResponse = await client.query({
        query: GET_POSTS
    });

    const categoryResponse = await client.query({
        query: GET_CATEGORIES
    });

    const posts = postResponse?.data?.posts?.nodes;
    const categories = categoryResponse?.data?.categories?.nodes;

    return {
        props: {
            posts,
            categories,
        },
        revalidate: 21,
    }
}
