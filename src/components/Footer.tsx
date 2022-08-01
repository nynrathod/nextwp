export default function Footer() {
    return (
        <>
            <footer>
                <div className="pt-8 md:pt-20">
                    <div className="container m-auto px-6 space-y-8 text-gray-800 md:px-12 lg:px-10">
                        <div className="py-8 border-t border-gray-400 text-gray-800 flex justify-between text-sm">
                            <span>&copy; 2022 Vercel. All right reserved <span id="year"></span></span>
                            <span>Powered by WP + Nextjs + WpGraphQl</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}