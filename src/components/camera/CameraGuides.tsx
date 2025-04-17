
import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

interface CameraGuidesProps {
  messages: {
    message: string;
    type: "ok" | "error";
  }[];
}

const CameraGuides: React.FC<CameraGuidesProps> = ({ messages }) => {
  return (
    <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center">
      {messages.length > 0 && (
        <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-3 text-white max-w-[90%]">
          {messages.map((msg, index) => (
            <div key={index} className="flex items-center mb-1 last:mb-0">
              {msg.type === "ok" ? (
                <CheckCircle size={16} className="text-green-400 mr-2 shrink-0" />
              ) : (
                <AlertCircle size={16} className="text-red-400 mr-2 shrink-0" />
              )}
              <span className={msg.type === "ok" ? "camera-guide-ok" : "camera-guide-error"}>
                {msg.message}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CameraGuides;
