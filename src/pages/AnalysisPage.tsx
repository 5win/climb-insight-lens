
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import VideoAnalysis from "../components/analysis/VideoAnalysis";
import { Button } from "@/components/ui/button";
import { Save, Share2, ArrowLeft } from "lucide-react";

// Mock feedback data for demonstration
const MOCK_FEEDBACK_MARKERS = [
  {
    id: "1",
    time: 2.5,
    message: "현재 팔을 너무 멀리 펴고 있고, 몸의 중심이 높아요. 발의 위치가 안정적이네요!",
    type: "neutral" as const,
  },
  {
    id: "2",
    time: 8.2,
    message: "오른팔에 힘이 과도하게 들어가 있어 힘 낭비가 있습니다. 더 이완된 자세를 취하세요.",
    type: "negative" as const,
  },
  {
    id: "3",
    time: 15.7,
    message: "중심 이동이 매우 안정적입니다. 무게 중심을 잘 유지하고 있어요.",
    type: "positive" as const,
  },
  {
    id: "4",
    time: 23.4,
    message: "무릎을 더 구부려 유연성을 높이면 다음 홀드 잡기가 더 수월할 거예요.",
    type: "neutral" as const,
  },
];

// Analysis stages
enum AnalysisStage {
  PROCESSING,
  COMPLETE,
}

const AnalysisPage = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<AnalysisStage>(AnalysisStage.PROCESSING);
  const [showContinueModal, setShowContinueModal] = useState(false);

  // Simulate analysis completion after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setStage(AnalysisStage.COMPLETE);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    // In a real app, we would handle saving the recording here
    setShowContinueModal(true);
  };

  const handleSaveToGallery = () => {
    // Here we would handle saving to gallery
    setShowContinueModal(false);
    navigate("/profile");
  };

  const handleReset = () => {
    navigate("/camera");
  };

  return (
    <Layout 
      title="분석" 
      showBackButton={true}
      showNav={false}
      className="flex flex-col"
    >
      {stage === AnalysisStage.PROCESSING ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <div className="w-20 h-20 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <img 
              src="/lovable-uploads/aa16f190-1bcb-4503-9244-0bd3d0dde66e.png" 
              alt="Analysis" 
              className="w-10 h-10 opacity-70"
            />
          </div>
          <h2 className="text-xl font-semibold mb-2">영상을 분석하고 있어요</h2>
          <p className="text-gray-600 mb-4">분석이 될때 진행 바를 넘어서 지루하지 않게 함</p>
          <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 mb-6">
            <div className="bg-climbLens-blue h-2.5 rounded-full w-1/2"></div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <VideoAnalysis markers={MOCK_FEEDBACK_MARKERS} />
          
          <div className="p-4 space-y-4">
            <div className="feedback-bubble">
              <h3 className="font-medium mb-1">전체 분석 요약</h3>
              <p className="text-sm text-gray-700">
                전반적으로 안정적인 클라이밍 자세를 유지하고 있으나, 상체에 힘이 과도하게 들어가 있습니다. 
                발의 위치는 좋지만 무릎 유연성이 부족하여 효율적인 움직임에 제한이 있습니다.
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={handleContinue}
                className="flex-1 button-primary"
              >
                <Save size={16} className="mr-1" />
                저장하기
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 size={16} className="mr-1" />
                공유하기
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Continue modal */}
      {showContinueModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-5">
            <h3 className="text-lg font-semibold mb-3">뒤로 가시겠어요?</h3>
            <p className="text-gray-600 mb-4">아직 분석이 진행 중이에요</p>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowContinueModal(false)}
                className="flex-1 py-2 bg-white border border-gray-300 rounded-md"
              >
                뒤로가기
              </button>
              <button 
                onClick={handleSaveToGallery}
                className="flex-1 py-2 bg-climbLens-blue text-white rounded-md"
              >
                기다릴게요
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AnalysisPage;
