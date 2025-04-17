
import { useState } from "react";
import Layout from "../components/layout/Layout";
import { Search, Filter } from "lucide-react";
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

// Mock data for demonstrations
const MOCK_ROUTES = [
  {
    id: "1",
    difficulty: "강남 논현",
    color: "빨강",
    thumbnail: "/lovable-uploads/9c6eb54d-5f54-4520-8208-4ec7c07c9c35.png",
    clearCount: 24,
    likeCount: 15,
  },
  {
    id: "2",
    difficulty: "홍대",
    color: "노랑",
    thumbnail: "/lovable-uploads/451e2e9d-9853-442c-905e-415cb3592c14.png",
    clearCount: 18,
    likeCount: 8,
  },
  {
    id: "3",
    difficulty: "강남 논현",
    color: "초록",
    thumbnail: "/lovable-uploads/b07825d5-59b3-4f95-a199-6c1906d289e8.png",
    clearCount: 32,
    likeCount: 22,
  },
];

// Filter options
const LOCATIONS = ["강남 논현", "홍대", "역삼"];
const DIFFICULTIES = ["초급", "중급", "상급"];
const COLORS = ["빨강", "노랑", "초록"];

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>(["강남 논현"]);
  
  // Selected filters
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  
  // Toggle filter selection
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  // Apply filter from popover
  const applyFilter = (type: string, value: string) => {
    if (value) {
      // Remove any existing filters of this type
      const filteredArray = activeFilters.filter(filter => 
        !(type === 'location' && LOCATIONS.includes(filter)) &&
        !(type === 'difficulty' && DIFFICULTIES.includes(filter)) &&
        !(type === 'color' && COLORS.includes(filter))
      );
      
      // Add the new filter
      setActiveFilters([...filteredArray, value]);
      
      // Update the specific selected filter state
      if (type === 'location') setSelectedLocation(value);
      if (type === 'difficulty') setSelectedDifficulty(value);
      if (type === 'color') setSelectedColor(value);
    }
  };

  return (
    <Layout title="검색">
      <div className="p-4">
        {/* Search bar */}
        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="센터, 난이도, 홀드 색상 검색"
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-climbLens-blue"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
        </div>
        
        {/* Filter buttons with popover */}
        <div className="flex justify-between gap-2 mb-4">
          <Popover>
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
                      activeFilters.includes(location) ? "bg-blue-100" : ""
                    }`}
                    onClick={() => applyFilter('location', location)}
                  >
                    {location}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover>
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
                    className={`p-2 cursor-pointer rounded-md ${
                      activeFilters.includes(difficulty) ? "bg-blue-100" : ""
                    }`}
                    onClick={() => applyFilter('difficulty', difficulty)}
                  >
                    {difficulty}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover>
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
                      activeFilters.includes(color) ? "bg-blue-100" : ""
                    }`}
                    onClick={() => applyFilter('color', color)}
                  >
                    <div className={`w-4 h-4 rounded-full ${
                      color === "빨강" ? "bg-red-500" : 
                      color === "노랑" ? "bg-yellow-500" : 
                      "bg-green-500"
                    }`}></div>
                    {color}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Active filters display */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activeFilters.map((filter) => (
              <div 
                key={filter} 
                className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1"
                onClick={() => toggleFilter(filter)}
              >
                <span>{filter}</span>
                <button className="ml-1">&times;</button>
              </div>
            ))}
          </div>
        )}
        
        {/* Results */}
        <div className="space-y-4 mb-16">
          {MOCK_ROUTES.map((route) => (
            <div key={route.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <div className="aspect-video bg-gray-100 relative">
                <img 
                  src={route.thumbnail} 
                  alt={`${route.difficulty} ${route.color} 루트`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-3 bg-gradient-to-t from-black/60 to-transparent text-white">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${
                      route.color === "빨강" ? "bg-red-500" : 
                      route.color === "노랑" ? "bg-yellow-500" : 
                      "bg-green-500"
                    }`}></div>
                    <span>{route.color}</span>
                  </div>
                  <div className="text-sm">
                    {route.difficulty}
                  </div>
                </div>
              </div>
              <div className="p-3 flex justify-between items-center">
                <div className="text-sm text-gray-700">
                  클리어 {route.clearCount}회
                </div>
                <div className="text-sm text-gray-700 flex items-center gap-1">
                  <span>좋아요 {route.likeCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
