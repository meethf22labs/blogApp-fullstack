import React, { useState, useEffect } from 'react';
import api_url from "../ipconfig"
import CreateBlog from './CreateBlog';


const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tag, setTag] = useState("");
    const [page, setPage] = useState(1);


    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${api_url}/posts?page=${page}&tag=${tag}`);
            const data = await response.json();
            setPosts(data);
            console.log(posts)
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }


    useEffect(() => {
        fetchBlogs();
    }, [page, tag])

    return (
        <div className="min-h-screen flex flex-col justify-between max-w-5xl mx-auto px-4 py-8 space-y-5">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-blue-600">📝 Tech Blogs</h1>
                <CreateBlog />
            </div>


            <select
                className="px-5 py-2 border-b outline-none text-2xl"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
            >
                <option value="">All Tags</option>
                <option value="Express">Express</option>
                <option value="React">React</option>
                <option value="Node.js">Node.js</option>
            </select>


            <div className=' py-5'>
            {loading ? (
                <p className="text-center text-gray-500">Loading posts...</p>
            ) : posts.length === 0 ? (
                <p className="text-center text-gray-500">No posts found.</p>
            ) : (

                <div className="space-y-6">
                    {posts.posts.map((blog, index) => (
                        <div className="border p-4 rounded-xl shadow-lg border-gray-400 flex flex-col" key={index}>
                            <div className=' flex items-center justify-between'>
                                <h2 className="text-2xl font-semibold text-blue-700">{blog.title}</h2>
                                <h2>{blog.category}</h2>
                            </div>
                            <p className="text-sm text-gray-600">
                                By <span className="font-medium">{blog.username}</span> •{' '}
                                <span className="italic">{blog.category}</span>
                            </p>
                            <p className="mt-2 text-gray-700 break-words max-h-40 overflow-hidden">{blog.content}</p>

                            {/* <div className="mt-3 flex flex-wrap gap-2">
                                {(blog.tags || []).map((tag, i) => (
                                    <span key={i} className="bg-gray-200 text-sm px-2 py-1 rounded-full text-gray-700">
                                        #{tag}
                                    </span>
                                ))}
                            </div> */}
                        </div>
                    ))}
                </div>
            )}
            </div>


            <div className="flex justify-center mt-8 gap-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    ⬅ Prev
                </button>
                <span className="px-4 py-2 text-gray-700 font-medium">Page {page}</span>
                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Next ➡
                </button>
            </div>

        </div>
    )
}

export default HomePage