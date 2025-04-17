
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Mail, Lock, LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  
  const toggleAuthMode = () => setIsLogin(!isLogin);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };
  
  return (
    <Layout showHeader={true} showBackButton={true} showNav={false} showLogin={false}>
      <div className="p-6 flex flex-col h-full">
        <h1 className="text-2xl font-bold mb-6">
          {isLogin ? '로그인' : '회원가입'}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            {!isLogin && (
              <div className="space-y-1">
                <label htmlFor="username" className="block text-sm font-medium">
                  사용자 이름
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                    placeholder="사용자 이름을 입력하세요"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium">
                이메일
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="이메일을 입력하세요"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium">
                비밀번호
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </div>
            </div>
          </div>
          
          <Button type="submit" className="w-full button-primary">
            <LogIn size={16} className="mr-2" />
            {isLogin ? '로그인' : '가입하기'}
          </Button>
        </form>
        
        <div className="mt-6 border-t border-gray-200 pt-6">
          <div className="text-center">
            <button
              onClick={toggleAuthMode}
              className="text-sm text-climbLens-blue hover:underline"
            >
              {isLogin ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
