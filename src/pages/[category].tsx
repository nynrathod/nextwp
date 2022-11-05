import { useRouter } from "next/router";

import { client } from '../lib/apollo';
import { gql } from "@apollo/client";

import Layout from '@components/Layout';
import PostCard from "@components/Post/PostCard";
import React from "react";

export default function ArchivePage({ posts }: { posts: any }) {
    const router = useRouter();

    return (
        <>
            <Layout>
                {/* {router.asPath} */}

                <section className="text-gray-600 bg-gray-100 body-font">
                    <div className="container px-5 pt-16 pb-24 mx-auto">

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
                </section>

            </Layout>
        </>
    )
}

export async function getStaticPaths() {
    const GET_CATEGORIES = gql`
    query CategoriesQuery {
        categories(where: {exclude: "1"}) {
            nodes {
                name
                slug
                databaseId
            }
        }
    }`;

    const categoryResponse = await client.query({
        query: GET_CATEGORIES
    });
    const categories = categoryResponse?.data?.categories?.nodes;

    const paths = categories.map((category: { slug: any; }) => ({
        params: { category: category.slug.toString() },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }: { params: any }) {
    const categoryName = params.toString();
    // console.log(category)
    const GET_POSTS = gql`
    query GetPostsByCategorySlug($categoryName: String) {
        posts( where: {categoryName: $categoryName} ) {
            nodes {
                title
                slug
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

    const postResponse = await client.query({
        query: GET_POSTS,
        variables: {
            categoryName: params.category
        }
    });

    const posts = postResponse?.data?.posts?.nodes;

    return {
        props: {
            posts
        },
    }
}
