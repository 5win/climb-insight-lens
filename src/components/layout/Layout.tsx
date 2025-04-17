
import { ReactNode } from "react";
import BottomNav from "./BottomNav";
import AppHeader from "./AppHeader";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
  showBackButton?: boolean;
  showLogin?: boolean;
  showNav?: boolean;
  showSettings?: boolean;
  className?: string;
}

const Layout = ({
  children,
  title,
  showHeader = true,
  showBackButton = false,
  showLogin = true,
  showNav = true,
  showSettings = false,
  className = "",
}: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-y-auto">
      {showHeader && (
        <AppHeader 
          title={title} 
          showBackButton={showBackButton} 
          showLogin={showLogin}
          showSettings={showSettings}
        />
      )}
      
      <main className={`flex-1 overflow-y-auto ${className}`}>
        {children}
      </main>
      
      {showNav && <BottomNav />}
    </div>
  );
};

export default Layout;
