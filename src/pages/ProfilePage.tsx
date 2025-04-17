
import { useState } from "react";
import Layout from "../components/layout/Layout";
import { Settings, Grid3X3 } from "lucide-react";

const ProfilePage = () => {
  // Mock user data
  const user = {
    username: "이강민 #0782",
    profileImage: null,
    videoCount: 12,
  };

  // Mock videos data
  const videos = Array(10).fill(null).map((_, i) => ({
    id: `video-${i}`,
    thumbnail: i % 3 === 0 ? "/lovable-uploads/9c6eb54d-5f54-4520-8208-4ec7c07c9c35.png" : 
              i % 3 === 1 ? "/lovable-uploads/451e2e9d-9853-442c-905e-415cb3592c14.png" : 
              "/lovable-uploads/b07825d5-59b3-4f95-a199-6c1906d289e8.png",
    isCleared: i % 3 === 0,
    date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
  }));

  return (
    <Layout title="프로필" showSettings={true}>
      <div className="p-4">
        {/* User info */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {user.profileImage ? (
              <img 
                src={user.profileImage} 
                alt={user.username} 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl text-gray-400">👤</span>
            )}
          </div>
          <div>
            <h2 className="font-medium">{user.username}</h2>
            <p className="text-sm text-gray-600">나의 영상 {user.videoCount}개</p>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="영상 검색"
            className="w-full bg-gray-100 px-4 py-2 rounded-lg"
          />
        </div>
        
        {/* Videos grid */}
        <div className="grid grid-cols-3 gap-1 mb-16">
          {videos.map((video) => (
            <div 
              key={video.id}
              className={`aspect-square bg-gray-100 relative ${video.isCleared ? 'border-2 border-yellow-400' : ''}`}
            >
              <img 
                src={video.thumbnail} 
                alt="Climbing video thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
