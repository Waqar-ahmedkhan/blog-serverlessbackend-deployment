import { createPostInput } from '@vickikhan/common';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

function Publish() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    const result = createPostInput.safeParse({ title, content, published });
    console.log('Validation result:', result);
    if (!result.success) {
      setError(result.error.errors.map(err => err.message).join(', '));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateInputs()) {
      return;
    }

    try {
      const authenticationHeader = localStorage.getItem("token");
      const response = await axios.post('http://127.0.0.1:8787/api/v1/blog', 
        { title, content, published },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authenticationHeader}`
          }
        }
      );

      if (response.data.id) {
        setSuccess(true);
        setTitle('');
        setContent('');
        setPublished(false);
        navigate(`/blog/${response.data.id}`);
      }
    } catch (err) {
      console.error('Error details:', err.response || err);
      setError(err.response?.data?.error || 'An error occurred while publishing the post');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Publish a New Blog Post</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              placeholder="Write your blog content here"
              rows="10"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm">Publish immediately</span>
            </label>
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          {success && <p className="text-green-500 text-xs italic mb-4">Blog post published successfully!</p>}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Publish;
