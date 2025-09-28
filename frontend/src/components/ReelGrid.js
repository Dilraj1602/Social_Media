import React from 'react';
import { Play, Heart, MessageCircle, Share, Eye, Clock } from 'lucide-react';

const ReelGrid = ({ reels }) => {
  if (!reels || reels.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 bg-dark-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Play className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No reels found</h3>
        <p className="text-gray-400">This influencer hasn't created any reels yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Recent Reels</h2>
        <span className="text-gray-400">{reels.length} reels</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reels.map((reel) => (
          <div key={reel._id} className="card card-hover group">
            <div className="relative mb-4">
              <img
                src={reel.thumbnailUrl}
                alt={reel.caption || 'Reel thumbnail'}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-1 bg-black bg-opacity-50 px-3 py-2 rounded-full">
                      <Eye className="w-4 h-4 text-white" />
                      <span className="text-white text-sm">{reel.views?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-black bg-opacity-50 px-3 py-2 rounded-full">
                      <Heart className="w-4 h-4 text-white" />
                      <span className="text-white text-sm">{reel.likes?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {reel.duration && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded text-white text-xs flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{Math.floor(reel.duration / 60)}:{(reel.duration % 60).toString().padStart(2, '0')}</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {reel.caption && (
                <p className="text-gray-300 text-sm line-clamp-3">
                  {reel.caption}
                </p>
              )}

              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(reel.postDate).toLocaleDateString()}</span>
                </div>
                <span className="capitalize">Reel</span>
              </div>

              {reel.analysis && (
                <div className="space-y-2">
                  {reel.analysis.vibe && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-primary-400 capitalize">
                        {reel.analysis.vibe}
                      </span>
                    </div>
                  )}
                  
                  {reel.analysis.events && reel.analysis.events.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {reel.analysis.events.slice(0, 3).map((event, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-900 text-blue-300 text-xs rounded-full"
                        >
                          {event}
                        </span>
                      ))}
                    </div>
                  )}

                  {reel.analysis.tags && reel.analysis.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {reel.analysis.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-dark-700 text-gray-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="pt-3 border-t border-dark-700">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-300">{reel.views?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span className="text-gray-300">{reel.likes?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-300">{reel.comments?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Share className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-300">{reel.shares?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {reel.analysis?.quality && (
                <div className="pt-3 border-t border-dark-700">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Video Quality: {reel.analysis.quality.videoQuality}</span>
                    <span>Audio: {reel.analysis.quality.audioQuality}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReelGrid;


