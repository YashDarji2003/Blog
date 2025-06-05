import React from 'react';
import { Card } from 'react-bootstrap';

const BlogCard = ({ blog }) => {
  return (
    <Card className="blog-card bg-dark text-light border-secondary">
      <Card.Img variant="top" src={blog.image} />
      <Card.Body>
        <span className="badge bg-info mb-2">{blog.category}</span>
        <Card.Title className="text-white">{blog.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{blog.date}</Card.Subtitle>
        <Card.Text>{blog.intro}</Card.Text>
        <div className="d-flex justify-content-between align-items-center small mt-3">
          <span>👤 {blog.author}</span>
          <span>💬 {blog.comments} • 👁️ {blog.views}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
