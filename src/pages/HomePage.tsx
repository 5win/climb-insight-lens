
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Camera, UploadCloud } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  
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
          
          {/* 3D Joint tracking explanation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-5">
            <h3 className="font-medium mb-3">클라이밍 3D 관절 이미지</h3>
            <div className="aspect-video bg-gray-100 flex items-center justify-center rounded-lg mb-3">
              <img 
                src="/lovable-uploads/5d2086a1-43c0-43f2-a714-a45b484220f5.png" 
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
