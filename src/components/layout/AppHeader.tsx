
import { ArrowLeft, LogIn, Settings } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

interface AppHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showLogin?: boolean;
  showSettings?: boolean;
}

const AppHeader = ({ 
  title, 
  showBackButton = false,
  showLogin = true,
  showSettings = false
}: AppHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        {showBackButton && (
          <button 
            onClick={() => navigate(-1)}
            className="mr-3 p-1"
            aria-label="뒤로가기"
          >
            <ArrowLeft size={20} className="text-gray-800" />
          </button>
        )}
        {title && <h1 className="text-lg font-semibold">{title}</h1>}
      </div>
      
      <div className="flex items-center">
        {showSettings && (
          <Link to="/settings" className="p-2">
            <Settings size={20} className="text-gray-800" />
          </Link>
        )}
        
        {showLogin && (
          <Link 
            to="/auth" 
            className="rounded-md px-3 py-1 text-sm bg-white border border-gray-300"
          >
            login
          </Link>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
