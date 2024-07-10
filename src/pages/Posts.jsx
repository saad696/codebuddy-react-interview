import { Icon } from "@iconify/react";
import { Col, Row, message } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostCard } from "../components";

const URL = "https://codebuddy.review/posts";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const res = await fetch(URL);
      const response = await res.json();

      setPosts(response.data);
    } catch (error) {
      message.error("Something went wrong while fetching post. Please refresh once to try again.");
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-7 text-4xl font-bold">Posts</h1>
      <Link to="/" className="mb-4 flex items-center text-blue-600 hover:underline">
        <Icon icon="mdi:arrow-left" className="mr-2" />
        Back to Home
      </Link>

      <Row gutter={[32, 32]}>
        {posts.map((post) => (
          <Col key={post.id} xs={24} md={12} lg={8}>
            <PostCard post={post} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Posts;
