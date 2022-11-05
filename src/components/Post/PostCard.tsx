import Link from "next/link"
import Image from "next/image"

export default function PostCard({ post }: { post: any }) {
    return (
        <>
            <Link href={`/posts${post.uri}`} className="card relative overflow-hidden block rounded-xl">
                <Image className="w-full" src={post?.featuredImage?.node?.sourceUrl} alt="games" width={100} height={100} objectFit="contain" />
                {/* <img className="w-full" src="https://cdn.tuk.dev/assets/components/111220/Blg-6/blog(2).png" alt="games" /> */}
                <div className="py-2 px-4 w-full flex justify-between bg-gray-700">
                    <p className="text-sm text-white font-semibold tracking-wide">Bruce Wayne</p>
                    <p className="text-sm text-white font-semibold tracking-wide">13TH Oct, 2020</p>
                </div>
                <div className="bg-white px-4 py-4 rounded-bl-3xl rounded-br-3xl">
                    <h1 className="text-lg text-gray-900 font-semibold tracking-wider">{post?.title}</h1>
                    {/* <article className="leading-relaxed mb-3 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.content }}></article> */}
                </div>
            </Link>
        </>
    )
}
