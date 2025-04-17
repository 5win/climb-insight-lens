
import { useState, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from "lucide-react";

interface FeedbackMarker {
  id: string;
  time: number;
  message: string;
  type: "positive" | "negative" | "neutral";
}

interface VideoAnalysisProps {
  videoSrc?: string; 
  markers?: FeedbackMarker[];
}

const VideoAnalysis = ({ videoSrc, markers = [] }: VideoAnalysisProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showJointOverlay, setShowJointOverlay] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<FeedbackMarker | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Handle video play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  // Handle time update
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };
  
  // Handle video load
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };
  
  // Skip forward/backward
  const skip = (amount: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += amount;
  };
  
  // Format time display
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Handle timeline seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  // Handle marker click
  const handleMarkerClick = (marker: FeedbackMarker) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = marker.time;
    setCurrentTime(marker.time);
    setSelectedMarker(marker);
  };

  // Reset video
  const resetVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    setCurrentTime(0);
    if (isPlaying) {
      videoRef.current.play();
    }
  };
  
  return (
    <div className="w-full flex flex-col">
      <div className="relative camera-container bg-gray-900">
        {/* Placeholder for demo */}
        {videoSrc ? (
          <video 
            ref={videoRef}
            src={videoSrc}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="h-full w-full object-contain"
            playsInline
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white text-center">
            <p className="text-lg mb-2">영상을 분석하고 있어요</p>
            <div className="w-40 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="bg-climbLens-blue h-full w-1/2 rounded-full"></div>
            </div>
          </div>
        )}

        {/* Joint overlay toggle button */}
        <div className="absolute bottom-4 left-4 bg-black/50 rounded-full px-2.5 py-1 text-white text-xs flex items-center">
          <input 
            type="checkbox" 
            id="joint-toggle"
            checked={showJointOverlay}
            onChange={() => setShowJointOverlay(!showJointOverlay)}
            className="mr-2"
          />
          <label htmlFor="joint-toggle">3D 관절 트래킹</label>
        </div>
      </div>
      
      {/* Video playback controls */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">{formatTime(currentTime)}</span>
          <div className="flex items-center space-x-3">
            <button 
              onClick={resetVideo} 
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="처음으로"
            >
              <RotateCcw size={18} />
            </button>
            <button 
              onClick={() => skip(-5)} 
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="5초 뒤로"
            >
              <SkipBack size={18} />
            </button>
            <button 
              onClick={togglePlay} 
              className="p-3 bg-climbLens-blue text-white rounded-full hover:bg-blue-600"
              aria-label={isPlaying ? "일시정지" : "재생"}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button 
              onClick={() => skip(5)} 
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="5초 앞으로"
            >
              <SkipForward size={18} />
            </button>
          </div>
          <span className="text-sm text-gray-600">{formatTime(duration)}</span>
        </div>
        
        {/* Timeline slider with markers */}
        <div className="relative mb-2">
          <input 
            type="range" 
            min="0" 
            max={duration || 100} 
            value={currentTime} 
            onChange={handleSeek}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          
          {/* Render markers on timeline */}
          {markers.map(marker => (
            <div 
              key={marker.id}
              onClick={() => handleMarkerClick(marker)}
              style={{ left: `${(marker.time / (duration || 1)) * 100}%` }}
              className={`timeline-marker ${marker.type === 'positive' ? 'bg-green-500' : marker.type === 'negative' ? 'bg-red-500' : 'bg-yellow-500'}`}
            ></div>
          ))}
        </div>
        
        {/* Current feedback */}
        {selectedMarker && (
          <div className="feedback-bubble">
            <p>{selectedMarker.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoAnalysis;
