import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Camera, UploadCloud } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";

const HomePage = () => {
  const navigate = useNavigate();
  
  // 이미지 경로 배열 생성
  const climbingImages = [
    "/climbing-images/full-shot-woman-climbing-wall.jpg",
    "/climbing-images/man-rock-climbing-indoors-arena.jpg",
    "/climbing-images/sportive-woman-clambering-wall-gym.jpg",
    "/climbing-images/climbing-skeleton2.jpg",
    "/climbing-images/KakaoTalk_20250418_170308572.jpg"
  ];
  
  // Mock climbing posts data with user information
  const climbingPosts = Array(10).fill(null).map((_, i) => ({
    id: `post-${i}`,
    title: `클라이밍 포스트 ${i + 1}`,
    image: climbingImages[i % climbingImages.length], // 순환적으로 이미지 할당
    username: `클라이머${i + 1}`,
    userAvatar: null,
    date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
    likes: Math.floor(Math.random() * 50) + 1,
    location: i % 2 === 0 ? "더 클라이밍 강남점" : "클라이밍 파크 홍대점",
  }));
  
  return (
    <Layout title="로고" showBackButton={false}>
      <div className="px-4 py-6 flex flex-col">
        {/* Main action card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-5">
          <h2 className="text-lg font-semibold mb-3">클라이밍 영상을 촬영하고<br/>AI에게 피드백 받기</h2>
          <div className="flex flex-col gap-3 mt-6">
            <button 
              onClick={() => navigate("/camera")}
              className="flex items-center gap-3 bg-climbLens-blue text-white py-3 px-4 rounded-lg"
            >
              <Camera size={20} />
              <span>촬영 시작하기</span>
            </button>
            <button 
              onClick={() => navigate("/upload")}
              className="flex items-center gap-3 bg-white border border-gray-300 py-3 px-4 rounded-lg"
            >
              <UploadCloud size={20} />
              <span>영상 업로드하기</span>
            </button>
          </div>
        </div>
        
        {/* Instagram-style climbing posts */}
        <div className="mb-5">
          <h3 className="font-medium mb-3">최근 클라이밍</h3>
          <div className="space-y-6 mb-16">
            {climbingPosts.map((post) => (
              <Card key={post.id} className="rounded-lg overflow-hidden shadow-sm">
                {/* Post header with user info */}
                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      {post.userAvatar ? (
                        <AvatarImage src={post.userAvatar} alt={post.username} />
                      ) : (
                        <AvatarFallback>{post.username.charAt(0)}</AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{post.username}</p>
                      <p className="text-xs text-gray-500">{post.location}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                
                {/* Post image */}
                <CardContent className="p-0">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full aspect-square object-cover" 
                  />
                </CardContent>
                
                {/* Post footer */}
                <div className="p-3">
                  <p className="text-sm font-medium mb-1">{post.title}</p>
                  <p className="text-xs text-gray-500">좋아요 {post.likes}개</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* 3D Joint tracking explanation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-16">
          <h3 className="font-medium mb-3">클라이밍 3D 관절 이미지</h3>
          <div className="aspect-video bg-gray-100 flex items-center justify-center rounded-lg mb-3">
            <img 
              src="/climbing-images/climbing-skeleton2.jpg" 
              alt="3D Joint Tracking" 
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <p className="text-sm text-gray-600">
            AI 자세 분석을 통해 어깨, 팔꿈치, 손목, 고관절, 무릎, 발목 등의 관절 움직임을 정밀하게 분석합니다.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
