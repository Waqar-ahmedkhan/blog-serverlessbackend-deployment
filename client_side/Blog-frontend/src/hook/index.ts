import axios from 'axios';
import { useEffect, useState } from 'react';


interface BlogAuthor {
  name: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: BlogAuthor;
}

export function useBlog(id: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        setError('No blog ID provided');
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        setError('Authorization token is missing. Please sign in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get<Blog>(
          `http://127.0.0.1:8787/api/v1/blog/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBlog(response.data);
        console.log(response.data)
      } catch (err) {
        console.error("Error fetching blog:", err);
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            setError('Blog post not found');
          } else if (err.response?.status === 401) {
            setError('Your session has expired. Please sign in again.');
            localStorage.removeItem("token");
          } else {
            setError(err.response?.data?.message || 'An error occurred while fetching the blog');
          }
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  return { loading, error, blog };
}

interface Blogs {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author: BlogAuthor;
}

export function useBlogs() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<Blogs[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError('Authorization token is missing. Please sign in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get<{ posts: Blogs[] }>(
          "http://127.0.0.1:8787/api/v1/blog/bulk",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBlogs(response.data.posts);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            setError('Your session has expired. Please sign in again.');
            localStorage.removeItem("token");
          } else {
            setError(err.response?.data?.message || 'An error occurred while fetching blogs');
          }
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { loading, error, blogs };
}
