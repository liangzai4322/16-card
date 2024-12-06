import React from 'react';
import { 
  Users, 
  TrendingUp, 
  Heart, 
  Globe, 
  ShoppingBag,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  { id: 'recruitment', name: 'Recruitment Data', icon: <Users className="h-5 w-5" /> },
  { id: 'stocks', name: 'Stock Data', icon: <TrendingUp className="h-5 w-5" /> },
  { id: 'xiaohongshu', name: 'Xiaohongshu Data', icon: <Heart className="h-5 w-5" /> },
  { id: 'international', name: 'International Sites', icon: <Globe className="h-5 w-5" /> },
  { id: 'ecommerce', name: 'E-commerce Sites', icon: <ShoppingBag className="h-5 w-5" /> },
];

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeCategory, 
  onCategoryChange,
  isCollapsed,
  onToggleCollapse
}) => {
  return (
    <div 
      className={`bg-white shadow-md h-screen sticky top-0 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-6 bg-white rounded-full p-1 shadow-md hover:bg-gray-50 transition-colors z-10"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4 text-gray-600" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        )}
      </button>

      <div className="p-4 space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeCategory === category.id
                ? 'bg-[rgb(222,83,14)] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title={isCollapsed ? category.name : undefined}
          >
            <div className={isCollapsed ? 'mx-auto' : ''}>
              {category.icon}
            </div>
            {!isCollapsed && <span className="font-medium">{category.name}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;