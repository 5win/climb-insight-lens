
import { useState } from "react";
import Layout from "../components/layout/Layout";
import { Search, Filter } from "lucide-react";

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

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>(["강남 논현"]);
  
  // Toggle filter selection
  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  // Filter tags
  const filterTags = [
    { id: "location-1", label: "강남 논현", category: "location" },
    { id: "location-2", label: "홍대", category: "location" },
    { id: "color-1", label: "빨강", category: "color" },
    { id: "color-2", label: "노랑", category: "color" },
    { id: "color-3", label: "초록", category: "color" },
  ];

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
        
        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {filterTags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => toggleFilter(tag.label)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
                activeFilters.includes(tag.label)
                  ? tag.category === "color"
                    ? `bg-${tag.label === "빨강" ? "red" : tag.label === "노랑" ? "yellow" : "green"}-500 text-white`
                    : "bg-climbLens-blue text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {tag.label}
            </button>
          ))}
          <button className="px-3 py-1.5 rounded-full text-sm whitespace-nowrap border border-dashed border-gray-300 flex items-center gap-1">
            <Filter size={14} />
            <span>필터</span>
          </button>
        </div>
        
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
