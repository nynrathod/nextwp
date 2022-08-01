import React from "react";
import { client } from '../lib/apollo';
import { gql } from "@apollo/client";

import Layout from "@components/Layout";
import PostCard from "@components/Post/PostCard";

export default function Articles({ posts }: { posts: any; }) {
    return (
        <>
            <Layout>
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4">
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
                {/* <h2>{new Date().getSeconds()}</h2> */}

            </Layout>
        </>
    );
}

export async function getServerSideProps() {
    const GET_POSTS = gql`
    query AllPostsQuery {
      posts {
        nodes {
          title
          content
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

    const response = await client.query({
        query: GET_POSTS
    });

    const posts = response?.data?.posts?.nodes;

    return {
        props: {
            posts,
        }
    }
}
