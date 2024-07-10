import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";

const PostCard = ({ post }) => {
  return (
    <>
      <Card cover={<img src={post.image} alt={post.firstName} />}>
        <Meta avatar={<Avatar src={post.avatar} />} title={`${post.firstName} ${post.lastName}`} />
        <p className="py-4">{post.writeup}</p>
      </Card>
    </>
  );
};

export default PostCard;
