import React, { useState } from 'react';
import { Layout, Sparkles } from 'lucide-react';
import Card from './Card';
import Pagination from './Pagination';
import ContactModal from './ContactModal';
import Sidebar from './Sidebar';
import { cards } from '../data';

const ITEMS_PER_PAGE = 8;

const GridView: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('recruitment');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const filteredCards = cards.filter(card => card.category === activeCategory);
  const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredCards.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page when changing categories
  };

  return (
    <div className="flex">
      <Sidebar 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <div className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Layout className="h-6 w-6 text-[rgb(222,83,14)]" />
                <h1 className="text-2xl font-bold text-gray-900">Featured Collection</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Sparkles className="h-6 w-6 text-[rgb(222,83,14)]" />
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[rgb(222,83,14)] text-white py-2 px-4 rounded-md hover:bg-[rgb(200,75,13)] transition-colors"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredCards.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {getCurrentPageItems().map((card) => (
                  <Card key={card.id} {...card} />
                ))}
              </div>
              
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No items found in this category.</p>
            </div>
          )}
        </main>

        <ContactModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default GridView;