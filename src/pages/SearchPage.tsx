import { useState, useEffect } from "react";
import React from "react";
import Layout from "../components/layout/Layout";
import { Search, Filter, Heart } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// 확장된 가상 데이터
interface ClimbingRoute {
  id: string;
  name: string;  // 루트 이름 추가
  location: string;  // 지점 필드 이름 변경
  difficulty: string;  // 난이도
  color: string;  // 홀드 색상
  thumbnail: string;
  clearCount: number;
  likeCount: number;
  description?: string;  // 설명 추가 (선택적)
}

// 더 많은 가상 데이터 생성
const MOCK_ROUTES: ClimbingRoute[] = [
  {
    id: "1",
    name: "스카이 클라이머",
    location: "강남 논현",
    difficulty: "흰색",
    color: "파란색",
    thumbnail: "/climbing-images/full-shot-woman-climbing-wall.jpg",
    clearCount: 24,
    likeCount: 15,
    description: "초보자를 위한 기본 코스"
  },
  {
    id: "2",
    name: "정글 러쉬",
    location: "홍대",
    difficulty: "노란색",
    color: "초록색",
    thumbnail: "/climbing-images/man-rock-climbing-indoors-arena.jpg",
    clearCount: 18,
    likeCount: 8,
    description: "다이나믹한 움직임이 필요한 코스"
  },
  {
    id: "3",
    name: "버티컬 챌린지",
    location: "강남 논현",
    difficulty: "초록색",
    color: "빨간색",
    thumbnail: "/climbing-images/sportive-woman-clambering-wall-gym.jpg",
    clearCount: 32,
    likeCount: 22,
    description: "균형감각을 테스트하는 코스"
  },
  {
    id: "4",
    name: "파워 무브",
    location: "역삼",
    difficulty: "빨간색",
    color: "검은색",
    thumbnail: "/climbing-images/climbing-skeleton2.jpg",
    clearCount: 8,
    likeCount: 19,
    description: "상체 힘을 테스트하는 어려운 코스"
  },
  {
    id: "5",
    name: "인피니티 라인",
    location: "홍대",
    difficulty: "보라색",
    color: "보라색",
    thumbnail: "/climbing-images/KakaoTalk_20250418_170308572.jpg",
    clearCount: 5,
    likeCount: 27,
    description: "연속된 작은 홀드가 특징"
  },
  {
    id: "6",
    name: "선라이즈",
    location: "강남 논현",
    difficulty: "노란색",
    color: "노란색",
    thumbnail: "/climbing-images/full-shot-woman-climbing-wall.jpg",
    clearCount: 42,
    likeCount: 35,
    description: "초보자부터 중급자까지 도전 가능한 밸런스 코스"
  },
  {
    id: "7",
    name: "문라이트 크랙",
    location: "역삼",
    difficulty: "파란색",
    color: "흰색",
    thumbnail: "/climbing-images/man-rock-climbing-indoors-arena.jpg",
    clearCount: 15,
    likeCount: 10,
    description: "크랙 클라이밍 기술 향상에 좋은 코스"
  },
  {
    id: "8",
    name: "다이나믹 다이브",
    location: "홍대",
    difficulty: "검은색",
    color: "주황색",
    thumbnail: "/climbing-images/sportive-woman-clambering-wall-gym.jpg",
    clearCount: 3,
    likeCount: 18,
    description: "전문가를 위한 다이나믹 코스"
  },
  {
    id: "9",
    name: "벌지 버스터",
    location: "강남 논현",
    difficulty: "빨간색",
    color: "분홍색",
    thumbnail: "/climbing-images/climbing-skeleton2.jpg",
    clearCount: 7,
    likeCount: 14,
    description: "오버행 구간을 극복하는 챌린지"
  },
  {
    id: "10",
    name: "테크니컬 트레버스",
    location: "역삼",
    difficulty: "초록색",
    color: "노란색",
    thumbnail: "/climbing-images/KakaoTalk_20250418_170308572.jpg",
    clearCount: 22,
    likeCount: 16,
    description: "측면 이동이 많은 기술적인 코스"
  },
  {
    id: "11",
    name: "크림슨 크라이머",
    location: "홍대",
    difficulty: "흰색",
    color: "빨간색",
    thumbnail: "/climbing-images/full-shot-woman-climbing-wall.jpg",
    clearCount: 31,
    likeCount: 24,
    description: "초보자를 위한 쉽지만 재미있는 코스"
  },
  {
    id: "12",
    name: "블루 스카이",
    location: "강남 논현",
    difficulty: "파란색",
    color: "파란색",
    thumbnail: "/climbing-images/man-rock-climbing-indoors-arena.jpg",
    clearCount: 19,
    likeCount: 17,
    description: "슬랩 클라이밍 연습에 좋은 코스"
  }
];

// Filter options
const LOCATIONS = ["강남 논현", "홍대", "역삼"];
const DIFFICULTIES = ["흰색", "노란색", "초록색", "파란색", "빨간색", "보라색", "검은색"];
const COLORS = ["흰색", "검은색", "보라색", "초록색", "파란색", "빨간색", "분홍색", "주황색", "노란색"];

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // 각 필터 유형별 상태 관리
  const [selectedLocation, setSelectedLocation] = useState<string | null>("강남 논현");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  
  // 필터링된 결과
  const [filteredRoutes, setFilteredRoutes] = useState<ClimbingRoute[]>(MOCK_ROUTES);
  
  // Popover open states
  const [locationPopoverOpen, setLocationPopoverOpen] = useState(false);
  const [difficultyPopoverOpen, setDifficultyPopoverOpen] = useState(false);
  const [colorPopoverOpen, setColorPopoverOpen] = useState(false);
  
  // 지점 필터 적용
  const applyLocationFilter = (location: string) => {
    setSelectedLocation(location);
    setLocationPopoverOpen(false);
  };
  
  // 난이도 필터 적용
  const applyDifficultyFilter = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    setDifficultyPopoverOpen(false);
  };
  
  // 홀드색 필터 적용
  const applyColorFilter = (color: string) => {
    setSelectedColor(color);
    setColorPopoverOpen(false);
  };
  
  // 필터 제거
  const removeLocationFilter = () => setSelectedLocation(null);
  const removeDifficultyFilter = () => setSelectedDifficulty(null);
  const removeColorFilter = () => setSelectedColor(null);

  // 검색어와 필터에 따라 루트 필터링
  useEffect(() => {
    let results = [...MOCK_ROUTES];
    
    // 검색어 필터링 (루트 이름, 지점, 난이도, 색상, 설명에서 검색)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      results = results.filter(route => 
        route.name.toLowerCase().includes(query) ||
        route.location.toLowerCase().includes(query) ||
        route.difficulty.toLowerCase().includes(query) ||
        route.color.toLowerCase().includes(query) ||
        (route.description && route.description.toLowerCase().includes(query))
      );
    }
    
    // 지점 필터링
    if (selectedLocation) {
      results = results.filter(route => route.location === selectedLocation);
    }
    
    // 난이도 필터링
    if (selectedDifficulty) {
      results = results.filter(route => route.difficulty === selectedDifficulty);
    }
    
    // 홀드색 필터링
    if (selectedColor) {
      results = results.filter(route => route.color === selectedColor);
    }
    
    setFilteredRoutes(results);
  }, [searchQuery, selectedLocation, selectedDifficulty, selectedColor]);

  return (
    <Layout title="검색">
      <div className="p-4">
        {/* Search bar */}
        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="루트 이름, 센터, 난이도, 홀드 색상 검색"
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-climbLens-blue"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
        </div>
        
        {/* Filter buttons with popover */}
        <div className="flex justify-between gap-2 mb-4">
          <Popover open={locationPopoverOpen} onOpenChange={setLocationPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex-1">
                지점
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <div className="p-2">
                {LOCATIONS.map((location) => (
                  <div 
                    key={location}
                    className={`p-2 cursor-pointer rounded-md ${
                      selectedLocation === location ? "bg-blue-100" : ""
                    }`}
                    onClick={() => applyLocationFilter(location)}
                  >
                    {location}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover open={difficultyPopoverOpen} onOpenChange={setDifficultyPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex-1">
                난이도
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <div className="p-2">
                {DIFFICULTIES.map((difficulty) => (
                  <div 
                    key={difficulty}
                    className={`p-2 cursor-pointer rounded-md flex items-center gap-2 ${
                      selectedDifficulty === difficulty ? "bg-blue-100" : ""
                    }`}
                    onClick={() => applyDifficultyFilter(difficulty)}
                  >
                    <div className={`w-4 h-4 rounded-full ${
                      difficulty === "흰색" ? "bg-gray-100 border border-gray-200" : 
                      difficulty === "노란색" ? "bg-yellow-400" : 
                      difficulty === "초록색" ? "bg-green-500" : 
                      difficulty === "파란색" ? "bg-blue-500" : 
                      difficulty === "빨간색" ? "bg-red-500" : 
                      difficulty === "보라색" ? "bg-purple-600" : 
                      "bg-black"
                    }`}></div>
                    {difficulty}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover open={colorPopoverOpen} onOpenChange={setColorPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex-1">
                홀드 색깔
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <div className="p-2">
                {COLORS.map((color) => (
                  <div 
                    key={color}
                    className={`p-2 cursor-pointer rounded-md flex items-center gap-2 ${
                      selectedColor === color ? "bg-blue-100" : ""
                    }`}
                    onClick={() => applyColorFilter(color)}
                  >
                    <div className={`w-4 h-4 rounded-full ${
                      color === "흰색" ? "bg-gray-100 border border-gray-200" : 
                      color === "검은색" ? "bg-black" : 
                      color === "보라색" ? "bg-purple-600" : 
                      color === "초록색" ? "bg-green-500" : 
                      color === "파란색" ? "bg-blue-500" : 
                      color === "빨간색" ? "bg-red-500" : 
                      color === "분홍색" ? "bg-pink-500" : 
                      color === "주황색" ? "bg-orange-500" : 
                      color === "노란색" ? "bg-yellow-400" :
                      "bg-gray-500"
                    }`}></div>
                    {color}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Active filters display */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* 지점 필터 */}
          {selectedLocation && (
            <div 
              className="px-3 py-1.5 bg-white text-gray-800 rounded-full text-sm flex items-center gap-1 border border-gray-200"
              onClick={removeLocationFilter}
            >
              <span className="text-gray-500 mr-1">지점:</span>
              <span>{selectedLocation}</span>
              <button className="ml-1 hover:text-gray-900">&times;</button>
            </div>
          )}
          
          {/* 난이도 필터 */}
          {selectedDifficulty && (
            <div 
              className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1 border border-gray-200 ${
                selectedDifficulty === "흰색" ? "bg-gray-100 text-gray-800" : 
                selectedDifficulty === "검은색" ? "bg-gray-800 text-white" : 
                selectedDifficulty === "보라색" ? "bg-purple-200 text-purple-800" : 
                selectedDifficulty === "초록색" ? "bg-green-200 text-green-800" : 
                selectedDifficulty === "파란색" ? "bg-blue-200 text-blue-800" : 
                selectedDifficulty === "빨간색" ? "bg-red-200 text-red-800" : 
                selectedDifficulty === "노란색" ? "bg-yellow-200 text-yellow-800" : 
                "bg-blue-100 text-blue-800"
              }`}
              onClick={removeDifficultyFilter}
            >
              <span className="text-gray-500 mr-1">난이도:</span>
              <div className={`w-3 h-3 rounded-full ${
                selectedDifficulty === "흰색" ? "bg-gray-100 border border-gray-200" : 
                selectedDifficulty === "검은색" ? "bg-black" : 
                selectedDifficulty === "보라색" ? "bg-purple-600" : 
                selectedDifficulty === "초록색" ? "bg-green-500" : 
                selectedDifficulty === "파란색" ? "bg-blue-500" : 
                selectedDifficulty === "빨간색" ? "bg-red-500" : 
                selectedDifficulty === "노란색" ? "bg-yellow-400" :
                "bg-gray-500"
              }`}></div>
              <span>{selectedDifficulty}</span>
              <button className="ml-1 hover:text-gray-900">&times;</button>
            </div>
          )}
          
          {/* 홀드색 필터 */}
          {selectedColor && (
            <div 
              className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-1 border border-gray-200 ${
                selectedColor === "흰색" ? "bg-gray-100 text-gray-800" : 
                selectedColor === "검은색" ? "bg-gray-800 text-white" : 
                selectedColor === "보라색" ? "bg-purple-200 text-purple-800" : 
                selectedColor === "초록색" ? "bg-green-200 text-green-800" : 
                selectedColor === "파란색" ? "bg-blue-200 text-blue-800" : 
                selectedColor === "빨간색" ? "bg-red-200 text-red-800" : 
                selectedColor === "분홍색" ? "bg-pink-200 text-pink-800" : 
                selectedColor === "주황색" ? "bg-orange-200 text-orange-800" : 
                selectedColor === "노란색" ? "bg-yellow-200 text-yellow-800" : 
                "bg-blue-100 text-blue-800"
              }`}
              onClick={removeColorFilter}
            >
              <span className="text-gray-500 mr-1">홀드색:</span>
              <div className={`w-3 h-3 rounded-full ${
                selectedColor === "흰색" ? "bg-gray-100 border border-gray-200" : 
                selectedColor === "검은색" ? "bg-black" : 
                selectedColor === "보라색" ? "bg-purple-600" : 
                selectedColor === "초록색" ? "bg-green-500" : 
                selectedColor === "파란색" ? "bg-blue-500" : 
                selectedColor === "빨간색" ? "bg-red-500" : 
                selectedColor === "분홍색" ? "bg-pink-500" : 
                selectedColor === "주황색" ? "bg-orange-500" : 
                selectedColor === "노란색" ? "bg-yellow-400" :
                "bg-gray-500"
              }`}></div>
              <span>{selectedColor}</span>
              <button className="ml-1 hover:text-gray-900">&times;</button>
            </div>
          )}
        </div>
        
        {/* 검색 결과 정보 표시 */}
        <div className="mb-4">
          <div className="text-sm text-gray-500">
            총 <span className="font-medium text-black">{filteredRoutes.length}</span>개의 루트가 검색되었습니다
          </div>
        </div>
        
        {/* Results */}
        {filteredRoutes.length > 0 ? (
          <div className="space-y-4 mb-16">
            {filteredRoutes.map((route) => (
              <div key={route.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                <div className="aspect-video bg-gray-100 relative">
                  <img 
                    src={route.thumbnail} 
                    alt={`${route.location} ${route.color} 루트`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <div className="text-sm font-medium">
                      {route.name}
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-lg">{route.name}</h3>
                      <p className="text-sm text-gray-500">{route.location}</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Heart size={16} className="text-gray-400" />
                      <span>{route.likeCount}</span>
                    </div>
                  </div>
                  
                  {/* 홀드색과 난이도 정보를 더 명확하게 표시 */}
                  <div className="flex flex-wrap gap-2 mb-2 mt-3">
                    {/* 홀드색 표시 */}
                    <div className="flex items-center px-2 py-1 rounded bg-gray-100 border border-gray-200">
                      <div className={`w-5 h-5 rounded-full mr-1.5 ${
                        route.color === "흰색" ? "bg-gray-100 border border-gray-300" : 
                        route.color === "검은색" ? "bg-black" : 
                        route.color === "보라색" ? "bg-purple-600" : 
                        route.color === "초록색" ? "bg-green-500" : 
                        route.color === "파란색" ? "bg-blue-500" : 
                        route.color === "빨간색" ? "bg-red-500" : 
                        route.color === "분홍색" ? "bg-pink-500" : 
                        route.color === "주황색" ? "bg-orange-500" : 
                        route.color === "노란색" ? "bg-yellow-400" :
                        "bg-gray-500"
                      }`}></div>
                      <span className="text-sm font-medium">{route.color}</span>
                    </div>
                    
                    {/* 난이도 표시 */}
                    <div className="flex items-center px-2 py-1 rounded border border-gray-200"
                      style={{
                        backgroundColor: route.difficulty === "흰색" ? "#f9fafb" : 
                                        route.difficulty === "노란색" ? "#fef3c7" : 
                                        route.difficulty === "초록색" ? "#d1fae5" : 
                                        route.difficulty === "파란색" ? "#dbeafe" : 
                                        route.difficulty === "빨간색" ? "#fee2e2" : 
                                        route.difficulty === "보라색" ? "#ede9fe" : 
                                        route.difficulty === "검은색" ? "#1f2937" : "#f3f4f6",
                        color: route.difficulty === "검은색" ? "white" : "inherit"
                      }}
                    >
                      <div className={`w-5 h-5 rounded-full mr-1.5 ${
                        route.difficulty === "흰색" ? "bg-gray-100 border border-gray-300" : 
                        route.difficulty === "노란색" ? "bg-yellow-400" : 
                        route.difficulty === "초록색" ? "bg-green-500" : 
                        route.difficulty === "파란색" ? "bg-blue-500" : 
                        route.difficulty === "빨간색" ? "bg-red-500" : 
                        route.difficulty === "보라색" ? "bg-purple-600" : 
                        route.difficulty === "검은색" ? "bg-black" : 
                        "bg-gray-500"
                      }`}></div>
                      <span className="text-sm font-medium">난이도: {route.difficulty}</span>
                    </div>
                  </div>
                  
                  {route.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">{route.description}</p>
                  )}
                  <div className="mt-2 text-xs text-gray-500">
                    클리어 {route.clearCount}회
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">검색 결과가 없습니다</div>
            <p className="text-sm text-gray-500">다른 검색어나 필터를 사용해보세요</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
