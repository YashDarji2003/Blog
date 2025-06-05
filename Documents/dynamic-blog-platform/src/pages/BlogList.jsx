// src/pages/BlogList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState('trending');

  const fetchBlogs = async (selectedTab, pageNumber) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please login to view blogs.');
      return;
    }

    const decoded = JSON.parse(atob(token.split('.')[1]));
    if (!decoded.role) {
      setError('Role not found in token. Please login again.');
      return;
    }

    if (decoded.role !== 'viewer') {
      setError('Access denied: Only readers can view blogs.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/blogs?page=${pageNumber}&limit=6&sort=${selectedTab}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.msg || 'Failed to fetch blogs.');
        return;
      }

      const data = await response.json();
      setBlogs(data);
      setHasMore(data.length === 6);
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  useEffect(() => {
    fetchBlogs(activeTab, page);
  }, [page, activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  const handleNext = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  if (error) {
    return (
      <div className="container text-center text-danger py-5">
        <h2>Blog Access</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="blog-page container py-5 text-white">
      <h2 className="text-center mb-2">Rental Tips & Blog</h2>
      <p className="text-center mb-4">Helpful articles for landlords and tenants</p>

      {/* Tabs */}
      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn btn-sm mx-2 ${activeTab === 'trending' ? 'btn-info text-dark' : 'btn-outline-info'}`}
          onClick={() => handleTabChange('trending')}
        >
          Trending
        </button>
        <button
          className={`btn btn-sm mx-2 ${activeTab === 'latest' ? 'btn-info text-dark' : 'btn-outline-info'}`}
          onClick={() => handleTabChange('latest')}
        >
          Latest
        </button>
      </div>

      {/* Blog Grid */}
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-md-4 mb-4" key={blog._id}>
            <div className="card bg-dark text-light border-info h-100">
              <img
                src={`http://localhost:4000/${blog.imageUrl}`}
                className="card-img-top"
                alt={blog.title}
              />
              <div className="card-body">
                <p className="text-info mb-1">{new Date(blog.createdAt).toDateString()}</p>
                <h5 className="card-title">{blog.title}</h5>
                <p className="card-text">{blog.content.slice(0, 100)}...</p>
                <Link to={`/blog/${blog._id}`} className="text-info fw-bold">
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-info mx-2"
          onClick={handlePrev}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-outline-info mx-2"
          onClick={handleNext}
          disabled={!hasMore}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogList;
