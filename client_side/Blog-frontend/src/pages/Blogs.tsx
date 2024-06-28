// Blogs.tsx
import React from 'react';
import BlogCard from "../components/BlogCart";
import Navbar from '../components/Navbar';
import { useBlogs } from '../hook/index';

const Blogs: React.FC = () => {
  const { loading, blogs, error } = useBlogs();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div>
      <Navbar />
      <div className="h-full w-full p-20">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            authorName={blog.author.name}
            blogTitle={blog.title}
            content={blog.content}
            // publishedDate={blog.publishedDate}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;