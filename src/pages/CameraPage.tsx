
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import CameraView from "../components/camera/CameraView";

const CameraPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();
  
  // Start recording
  const handleStartRecording = () => {
    setIsRecording(true);
  };
  
  // Stop recording and navigate to analysis
  const handleStopRecording = () => {
    setIsRecording(false);
    
    // In a real app, we would handle saving the recording here
    // For now, we'll just navigate to a mock analysis page
    setTimeout(() => {
      navigate("/analysis");
    }, 1000);
  };
  
  return (
    <Layout 
      showHeader={true}
      showBackButton={true}
      showNav={false}
      showLogin={true}
      className="flex flex-col"
      title="촬영"
    >
      <CameraView
        isRecording={isRecording}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
      />
    </Layout>
  );
};

export default CameraPage;
