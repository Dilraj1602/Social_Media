import React from 'react';
import { Heart, MessageCircle, Calendar, Tag } from 'lucide-react';

const PostGrid = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No posts found</h3>
        <p className="text-gray-400">This influencer hasn't posted any content yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Recent Posts</h2>
        <span className="text-gray-400">{posts.length} posts</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="card card-hover group">
            <div className="relative mb-4">
              <img
                src={post.imageUrl}
                alt={post.caption || 'Post image'}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-4">
                  <div className="flex items-center space-x-1 bg-black bg-opacity-50 px-3 py-2 rounded-full">
                    <Heart className="w-4 h-4 text-white" />
                    <span className="text-white text-sm">{post.likes?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-black bg-opacity-50 px-3 py-2 rounded-full">
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span className="text-white text-sm">{post.comments?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {post.caption && (
                <p className="text-gray-300 text-sm line-clamp-3">
                  {post.caption}
                </p>
              )}

              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.postDate).toLocaleDateString()}</span>
                </div>
                <span className="capitalize">{post.postType}</span>
              </div>

              {post.analysis && (
                <div className="space-y-2">
                  {post.analysis.vibe && (
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4 text-primary-500" />
                      <span className="text-sm text-primary-400 capitalize">
                        {post.analysis.vibe}
                      </span>
                    </div>
                  )}
                  
                  {post.analysis.keywords && post.analysis.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.analysis.keywords.slice(0, 3).map((keyword, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-dark-700 text-gray-300 text-xs rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="pt-3 border-t border-dark-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-gray-300">{post.likes?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-300">{post.comments?.toLocaleString()}</span>
                    </div>
                  </div>
                  {post.analysis?.quality && (
                    <div className="text-xs text-gray-400">
                      Quality: {post.analysis.quality.visualAppeal}/10
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostGrid;


