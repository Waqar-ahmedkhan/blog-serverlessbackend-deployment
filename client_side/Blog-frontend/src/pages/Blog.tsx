import React from 'react';
import { useParams } from 'react-router-dom';
import BlogPost from '../components/BlogPost';
import { useBlog } from '../hook/index';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex justify-center items-center h-screen">
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  </div>
);

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Debugging statements
  console.log('BlogPostPage rendered');
  console.log('useParams id:', id);

  const { loading, error, blog } = useBlog(id);

  if (!id) {
    return <ErrorMessage message="No blog post ID provided." />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">No blog post found.</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <BlogPost blog={blog} />
    </div>
  );
};

export default BlogPostPage;
