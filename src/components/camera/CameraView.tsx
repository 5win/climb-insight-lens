
import { useState, useRef, useEffect } from "react";
import { Camera } from "lucide-react";
import CameraGuides from "./CameraGuides";

interface CameraViewProps {
  onStartRecording: () => void;
  onStopRecording: () => void;
  isRecording: boolean;
}

const CameraView = ({ onStartRecording, onStopRecording, isRecording }: CameraViewProps) => {
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [guideMessages, setGuideMessages] = useState<{message: string, type: 'ok' | 'error'}[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  // Request camera access
  useEffect(() => {
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" }, 
          audio: true 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          setCameraPermission(true);
          setCameraReady(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setCameraPermission(false);
        setGuideMessages([{
          message: "카메라 접근 권한이 필요합니다",
          type: "error"
        }]);
      }
    };

    setupCamera();
    
    // Clean up
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, []);
  
  // Simulate guide messages
  useEffect(() => {
    if (cameraReady) {
      setGuideMessages([{
        message: "전체 무브가 잘 보이게 카메라를 두세요",
        type: "ok"
      }]);
    }
  }, [cameraReady]);

  // Handle recording button click
  const handleCameraButtonClick = () => {
    if (isRecording) {
      onStopRecording();
    } else {
      onStartRecording();
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center px-4 py-6">
      {/* Camera preview */}
      <div className="camera-container">
        {cameraPermission === false ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white text-center p-4">
            <Camera size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">카메라 접근이 필요합니다</p>
            <p className="text-sm text-gray-300 mb-4">클라이밍 동작을 분석하기 위해 카메라 접근 권한이 필요합니다.</p>
          </div>
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="h-full w-full object-cover"
          />
        )}
        
        {/* Camera guides */}
        <div className="camera-overlay">
          <CameraGuides messages={guideMessages} />
        </div>
        
        {/* Recording indicator */}
        {isRecording && (
          <div className="recording-indicator">
            <div className="recording-dot"></div>
            <span>녹화중..</span>
          </div>
        )}
      </div>
      
      {/* Camera button */}
      <div className="mt-6 flex flex-col items-center">
        <button
          onClick={handleCameraButtonClick}
          disabled={!cameraReady}
          className="w-16 h-16 flex items-center justify-center rounded-full border-4 border-gray-300 bg-white focus:outline-none"
        >
          <div className={`rounded-full ${isRecording ? 'bg-red-500 w-6 h-6' : 'bg-climbLens-blue w-12 h-12'}`}></div>
        </button>
        <p className="text-sm text-gray-500 mt-2">
          {isRecording ? '녹화 중지' : '녹화 시작'}
        </p>
      </div>
    </div>
  );
};

export default CameraView;
