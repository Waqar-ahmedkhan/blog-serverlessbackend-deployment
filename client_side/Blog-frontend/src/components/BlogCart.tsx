import { Link, useNavigate } from 'react-router-dom';

interface BlogCardProps {
  id: string;
  authorName?: string;
  blogTitle?: string;
  content?: string;
  publishedDate?: string;
}

function BlogCard({
  id,
  authorName,
  blogTitle,
  content,	
  publishedDate,
}: BlogCardProps) {
  const navigate = useNavigate();
  const formattedDate = publishedDate
    ? new Date(publishedDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : 'No date';

  const handleCardClick = () => {
    navigate(`/blog/${encodeURIComponent(id)}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold text-lg mr-3">
            {authorName ? authorName.charAt(0).toUpperCase() : '?'}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{authorName || 'Unknown Author'}</p>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-2 text-gray-800">{blogTitle || 'Untitled'}</h2>
      <p className="text-gray-700 mb-4">
        {content ? `${content.slice(0, 40)}...` : 'No content available'}
      </p>
      <div className="flex justify-between items-center">
        <Link 
          to={`/blog/${encodeURIComponent(id)}`}
          className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
        >
          Read More
        </Link>
        <span className="text-sm text-gray-500">
          {content ? `${Math.ceil(content.length / 100)} min read` : 'Unknown read time'}
        </span>
      </div>
    </div>
  );
}

export default BlogCard;
