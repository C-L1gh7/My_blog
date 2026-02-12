import React from 'react';
import { LayoutGroup } from 'framer-motion';
import PostCard, { type PostProps } from './PostCard';

interface PostListProps {
    posts: PostProps[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
    return (
        <LayoutGroup>
            <div className="grid gap-4">
                {posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
            </div>
        </LayoutGroup>
    );
};

export default PostList;