import React from 'react';

interface BlogAuthor {
  name: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: BlogAuthor;
}

interface BlogPostProps {
  blog: Blog;
}

const BlogPost: React.FC<BlogPostProps> = ({ blog }) => {
  return (
    <div className="max-w-5xl mx-auto my-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <div className="flex items-center mb-4">
        <img 
          src={`https://via.placeholder.com/150?text=${encodeURIComponent(blog.author.name)}`}
          alt={blog.author.name} 
          className="w-10 h-10 rounded-full mr-3"
        />
        <span className="text-gray-600">{blog.author.name}</span>
      </div>
      <p className="text-gray-700 mb-4">{blog.content}</p>
      <div className="text-sm text-gray-500">Post ID: {blog.id}</div>
    </div>
  );
};

export default BlogPost;
