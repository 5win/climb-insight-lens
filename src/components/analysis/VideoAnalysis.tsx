import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Flag } from "lucide-react";

// Import the climbing skeleton image
const climbingSkeletonImg = "/climbing-images/climbing-skeleton2.jpg";

interface FeedbackMarker {
  id: string;
  time: number;
  message: string;
  type: "positive" | "negative" | "neutral";
}

interface VideoAnalysisProps {
  videoSrc?: string; 
  markers?: FeedbackMarker[];
  customImageSrc?: string;
}

const VideoAnalysis = ({ videoSrc, markers = [], customImageSrc }: VideoAnalysisProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30); // Default 30 seconds for simulation
  const [showJointOverlay, setShowJointOverlay] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<FeedbackMarker | null>(null);
  const [progressPercentage, setProgressPercentage] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const simulationTimerRef = useRef<number | null>(null);
  
  // Simulate playback when there's no video
  useEffect(() => {
    // Only use simulation if there's no video source
    if (!videoSrc && isPlaying) {
      simulationTimerRef.current = window.setInterval(() => {
        setCurrentTime(prevTime => {
          const newTime = prevTime + 0.1;
          if (newTime >= duration) {
            // Stop at the end
            setIsPlaying(false);
            clearInterval(simulationTimerRef.current as number);
            return duration;
          }
          return newTime;
        });
      }, 100);
    } else if (!isPlaying && simulationTimerRef.current) {
      clearInterval(simulationTimerRef.current);
    }
    
    return () => {
      if (simulationTimerRef.current) {
        clearInterval(simulationTimerRef.current);
      }
    };
  }, [isPlaying, videoSrc, duration]);
  
  // Update progress when currentTime changes
  useEffect(() => {
    const percentage = (currentTime / duration) * 100;
    setProgressPercentage(percentage);
    updateSelectedMarker(currentTime);
  }, [currentTime, duration]);
  
  // Handle video play/pause
  const togglePlay = () => {
    if (videoRef.current && videoSrc) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
    // Toggle play state (will trigger simulation if no video)
    setIsPlaying(!isPlaying);
  };
  
  // Handle time update from actual video
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };
  
  // Update the selected marker based on current time
  const updateSelectedMarker = (time: number) => {
    // Find the nearest marker that is less than or equal to the current time
    const relevantMarkers = markers.filter(marker => marker.time <= time);
    if (relevantMarkers.length === 0) {
      setSelectedMarker(null);
      return;
    }
    
    // Get the marker with the highest time (closest to current time)
    const nearestMarker = relevantMarkers.reduce((prev, current) => 
      (current.time > prev.time) ? current : prev
    );
    
    setSelectedMarker(nearestMarker);
  };
  
  // Handle video load
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };
  
  // Skip forward/backward
  const skip = (amount: number) => {
    if (videoRef.current && videoSrc) {
      videoRef.current.currentTime += amount;
    } else {
      // For simulation
      const newTime = Math.max(0, Math.min(duration, currentTime + amount));
      setCurrentTime(newTime);
    }
  };
  
  // Format time display
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Handle timeline seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current && videoSrc) {
      videoRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };
  
  // Handle marker click
  const handleMarkerClick = (marker: FeedbackMarker) => {
    if (videoRef.current && videoSrc) {
      videoRef.current.currentTime = marker.time;
    }
    setCurrentTime(marker.time);
    setSelectedMarker(marker);
  };

  // Reset video
  const resetVideo = () => {
    if (videoRef.current && videoSrc) {
      videoRef.current.currentTime = 0;
    }
    setCurrentTime(0);
    setSelectedMarker(null);
  };

  // Automatically update marker when component mounts
  useEffect(() => {
    if (markers.length > 0) {
      const initialMarkers = markers.filter(marker => marker.time === 0);
      if (initialMarkers.length > 0) {
        setSelectedMarker(initialMarkers[0]);
      } else {
        // Default to first marker
        updateSelectedMarker(currentTime);
      }
    }
  }, [markers]);
  
  return (
    <div className="w-full flex flex-col">
      {/* Video container */}
      <div className="relative camera-container bg-gray-900" style={{ height: "55vh", minHeight: "300px" }}>
        {/* Video player */}
        {videoSrc ? (
          <video 
            ref={videoRef}
            src={videoSrc}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="h-full w-full object-cover"
            playsInline
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white text-center">
            <img 
              src={customImageSrc || climbingSkeletonImg} 
              alt="Climbing Analysis" 
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button 
            onClick={togglePlay}
            className="w-16 h-16 flex items-center justify-center bg-black/30 rounded-full text-white hover:bg-black/50 transition-colors"
          >
            {isPlaying ? 
              <Pause size={28} /> : 
              <Play size={28} className="ml-1" />
            }
          </button>
        </div>

        {/* Joint overlay toggle button */}
        <div className="absolute bottom-2 left-2 bg-black/50 rounded-full px-2 py-0.5 text-white text-xs flex items-center">
          <input 
            type="checkbox" 
            id="joint-toggle"
            checked={showJointOverlay}
            onChange={() => setShowJointOverlay(!showJointOverlay)}
            className="mr-1"
          />
          <label htmlFor="joint-toggle">3D 관절 트래킹</label>
        </div>
      </div>
      
      {/* Playback controls with timeline */}
      <div className="bg-white py-2 px-3">
        {/* Timeline with flag markers */}
        <div className="relative mt-2">
          {/* Time indicators */}
          <div className="flex justify-between w-full mb-1 text-xs text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          
          {/* Render markers as flags above the timeline */}
          <div className="flex justify-between w-full mb-1">
            {markers.map(marker => (
              <button
                key={marker.id}
                onClick={() => handleMarkerClick(marker)}
                className="flex flex-col items-center justify-end"
                title={marker.message}
              >
                <Flag 
                  size={16} 
                  className={`${
                    marker.type === 'positive' ? 'text-green-500' : 
                    marker.type === 'negative' ? 'text-red-500' : 'text-yellow-500'
                  }`}
                />
              </button>
            ))}
          </div>
          
          {/* Progress bar with thumb */}
          <div className="relative w-full h-3 bg-gray-200 rounded-lg">
            <div 
              className="absolute top-0 left-0 h-3 bg-black rounded-lg" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
            
            {/* Seek thumb */}
            <div 
              className="absolute top-1/2 w-5 h-5 bg-white border-2 border-black rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-md" 
              style={{ left: `${progressPercentage}%` }}
            ></div>
            
            {/* Hidden range input for seeking */}
            <input 
              type="range" 
              min="0" 
              max={duration} 
              step="0.1"
              value={currentTime} 
              onChange={handleSeek}
              className="absolute top-0 left-0 w-full h-3 opacity-0 cursor-pointer z-10"
            />
          </div>
        </div>
        
        {/* Playback control buttons */}
        <div className="flex justify-center items-center space-x-4 mt-3 mb-1">
          <button 
            onClick={() => skip(-10)} 
            className="p-1 text-gray-700"
            aria-label="10초 뒤로"
          >
            <SkipBack size={20} />
          </button>
          <button 
            onClick={togglePlay} 
            className="p-1 text-gray-700"
            aria-label={isPlaying ? "일시정지" : "재생"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
          </button>
          <button 
            onClick={() => skip(10)} 
            className="p-1 text-gray-700"
            aria-label="10초 앞으로"
          >
            <SkipForward size={20} />
          </button>
        </div>
      </div>
      
      {/* Current feedback - as a separate bubble below timeline */}
      {selectedMarker && (
        <div className="mx-4 my-2 p-3 bg-white rounded-lg text-sm shadow-md border border-gray-100">
          <p className={`${
            selectedMarker.type === 'positive' ? 'text-green-700' : 
            selectedMarker.type === 'negative' ? 'text-red-700' : 'text-gray-700'
          }`}>
            {selectedMarker.message}
          </p>
        </div>
      )}
      
      {/* Show a default message if no marker is selected */}
      {!selectedMarker && (
        <div className="mx-4 my-2 p-3 bg-white rounded-lg text-sm shadow-md border border-gray-100">
          <p className="text-gray-500">
            현재 팔을 너무 멀리 펴고 있고, 몸의 중심이 높아요.
            <br />발의 위치가 안정적이네요!
            <br />발의 위치가 안정적이네요!
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoAnalysis;
