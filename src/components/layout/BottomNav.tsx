
import { Home, Camera, Search, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, path: "/", label: "홈" },
    { icon: Camera, path: "/camera", label: "촬영" },
    { icon: Search, path: "/search", label: "검색" },
    { icon: User, path: "/profile", label: "프로필" },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className="bottom-nav-item"
          >
            <item.icon size={24} 
              className={isActive ? "text-climbLens-blue" : "text-gray-500"} 
            />
            <span className={`text-xs mt-1 ${isActive ? "text-climbLens-blue font-medium" : "text-gray-500"}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNav;
