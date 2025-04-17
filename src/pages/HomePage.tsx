
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Camera, UploadCloud } from "lucide-react";
import { ScrollArea } from "../components/ui/scroll-area";
import { Card, CardContent } from "../components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../components/ui/carousel";

const HomePage = () => {
  const navigate = useNavigate();
  
  // Mock climbing posts data 
  const climbingPosts = Array(5).fill(null).map((_, i) => ({
    id: `post-${i}`,
    title: `클라이밍 포스트 ${i + 1}`,
    image: "/lovable-uploads/3f9f8240-af71-433a-ad0b-b602ba8e0a5f.png",
  }));
  
  return (
    <Layout title="로고" showBackButton={false}>
      <div className="px-4 py-6 flex flex-col h-full">
        <div className="flex-1">
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
          
          {/* Scrollable climbing posts */}
          <div className="mb-5">
            <h3 className="font-medium mb-3">최근 클라이밍</h3>
            <ScrollArea className="h-64 w-full rounded-md">
              <div className="flex flex-col space-y-4 p-1">
                {climbingPosts.map((post) => (
                  <Card key={post.id} className="rounded-lg overflow-hidden shadow-sm">
                    <CardContent className="p-0">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover" 
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* 3D Joint tracking explanation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-5">
            <h3 className="font-medium mb-3">클라이밍 3D 관절 이미지</h3>
            <div className="aspect-video bg-gray-100 flex items-center justify-center rounded-lg mb-3">
              <img 
                src="/lovable-uploads/3f9f8240-af71-433a-ad0b-b602ba8e0a5f.png" 
                alt="3D Joint Tracking" 
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            <p className="text-sm text-gray-600">
              AI 자세 분석을 통해 어깨, 팔꿈치, 손목, 고관절, 무릎, 발목 등의 관절 움직임을 정밀하게 분석합니다.
            </p>
          </div>
        </div>
        
        {/* Search action */}
        <div className="mb-16">
          <input
            type="text"
            placeholder="이름"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-climbLens-blue"
          />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
