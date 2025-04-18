import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import VideoAnalysis from "../components/analysis/VideoAnalysis";
import { Button } from "@/components/ui/button";
import { Save, Share2, ArrowLeft, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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

// Sample climbing image as data URL (this would typically come from camera capture)
const climbingImageDataURL = "/climbing-images/KakaoTalk_20250418_170308572.jpg";

// Analysis stages
enum AnalysisStage {
  PROCESSING,
  COMPLETE,
}

const AnalysisPage = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<AnalysisStage>(AnalysisStage.PROCESSING);
  const [showContinueModal, setShowContinueModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Simulate analysis completion after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setStage(AnalysisStage.COMPLETE);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSave = () => {
    // Show saving state
    setIsSaving(true);
    
    // Simulate saving delay
    setTimeout(() => {
      // Show success notification
      toast({
        title: "저장 완료",
        description: "로컬 갤러리에 저장되었어요!",
        variant: "default",
      });
      
      // Navigate to home screen after a short delay
      setTimeout(() => {
        setIsSaving(false);
        navigate("/");
      }, 1000);
    }, 800);
  };

  const handleShare = () => {
    // Implement share functionality
    toast({
      title: "공유하기",
      description: "공유 기능은 준비 중입니다.",
      variant: "default",
    });
  };

  return (
    <Layout 
      title="분석" 
      showBackButton={true}
      showNav={false}
      className="flex flex-col h-[100vh] overflow-hidden"
    >
      {stage === AnalysisStage.PROCESSING ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <div className="w-16 h-16 mb-2 rounded-full bg-gray-100 flex items-center justify-center">
            <img 
              src="/climbing-images/climbing-skeleton2.jpg" 
              alt="Analysis" 
              className="w-8 h-8 opacity-70"
            />
          </div>
          <h2 className="text-lg font-semibold mb-1">영상을 분석하고 있어요</h2>
          <p className="text-sm text-gray-600 mb-3">영상을 분석중이에요</p>
          <div className="w-full max-w-xs bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-climbLens-blue h-2 rounded-full w-1/2"></div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main analysis content */}
          <div className="flex-1 overflow-hidden">
            <VideoAnalysis 
              markers={MOCK_FEEDBACK_MARKERS} 
              customImageSrc={climbingImageDataURL}
            />
          </div>
          
          {/* Action buttons at bottom */}
          <div className="flex-shrink-0 p-3 bg-white border-t border-gray-200">
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full py-5 bg-white border border-gray-300 rounded-md text-black hover:bg-gray-50 transition-all relative"
                variant="outline"
              >
                {isSaving ? (
                  <>
                    <span className="opacity-0">저장하기</span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  </>
                ) : (
                  "저장하기"
                )}
              </Button>
              <Button 
                onClick={handleShare}
                variant="outline" 
                className="w-full py-5 bg-white border border-gray-300 rounded-md text-black hover:bg-gray-50"
              >
                공유하기
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Success message for saved content */}
      {isSaving && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg py-4 px-6 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-center font-medium">로컬 갤러리에 저장되었어요!</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AnalysisPage;
