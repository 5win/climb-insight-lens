import { useState } from "react";
import Layout from "../components/layout/Layout";
import { Settings, Grid3X3 } from "lucide-react";

const ProfilePage = () => {
  // Mock user data
  const user = {
    username: "이강민 #0782",
    profileImage: "/climbing-images/sportive-woman-clambering-wall-gym.jpg",
    videoCount: 12,
  };

  // 이미지 경로 배열 생성
  const climbingImages = [
    "/climbing-images/full-shot-woman-climbing-wall.jpg",
    "/climbing-images/man-rock-climbing-indoors-arena.jpg",
    "/climbing-images/sportive-woman-clambering-wall-gym.jpg",
    "/climbing-images/climbing-skeleton2.jpg",
    "/climbing-images/KakaoTalk_20250418_170308572.jpg"
  ];

  // Mock videos data
  const videos = Array(10).fill(null).map((_, i) => ({
    id: `video-${i}`,
    thumbnail: climbingImages[i % climbingImages.length], 
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
