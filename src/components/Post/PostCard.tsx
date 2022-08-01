import Link from "next/link"
import Image from "next/image"

export default function PostCard({ post }: { post: any }) {
    return (
        <>
            <div className="p-4 md:w-1/3">
                <Link href={`/posts${post.uri}`}>
                    <a className="card">
                        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                            <div style={{ position: 'relative', width: '100%', height: '215px' }}>
                                <Image
                                    alt="Mountains"
                                    src={post?.featuredImage?.node?.sourceUrl}
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                            <div className="p-6">
                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{post?.title}</h1>
                                <article className="leading-relaxed mb-3 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.content }}></article>
                                <div className="flex items-center flex-wrap ">Learn More
                                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </a>
                </Link>
            </div>
        </>
    )
}

