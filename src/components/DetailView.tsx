import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Layout } from 'lucide-react';
import { cards } from '../data';
import ContactModal from './ContactModal';
import Card from './Card';
import Sidebar from './Sidebar';

const DetailView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('recruitment');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const card = cards.find(c => c.id === Number(id));
  const relatedCards = cards
    .filter(c => c.id !== Number(id) && c.category === card?.category)
    .slice(0, 4);

  if (!card) {
    return <div>Item not found</div>;
  }

  const handlePrevImage = () => {
    setActiveImage((prev) => (prev === 0 ? card.gallery.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImage((prev) => (prev === card.gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar 
        activeCategory={activeCategory}
        onCategoryChange={(category) => {
          setActiveCategory(category);
          navigate('/');
        }}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <div className="flex-1">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Gallery
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[rgb(222,83,14)] text-white py-2 px-4 rounded-md hover:bg-[rgb(200,75,13)] transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="relative">
              <img
                src={card.gallery[activeImage]}
                alt={`${card.title} - Image ${activeImage + 1}`}
                className="w-full h-[600px] object-cover rounded-lg shadow-lg"
              />
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                {card.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`flex-shrink-0 ${
                      activeImage === index
                        ? 'ring-2 ring-[rgb(222,83,14)]'
                        : 'hover:opacity-75'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-20 w-32 object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{card.title}</h1>
                <p className="text-lg text-gray-600">{card.description}</p>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{card.content}</p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-[rgb(222,83,14)] text-white py-3 px-6 rounded-md hover:bg-[rgb(200,75,13)] transition-colors text-lg font-semibold"
              >
                Get in Touch
              </button>
            </div>
          </div>

          {relatedCards.length > 0 && (
            <div className="border-t pt-12">
              <div className="flex items-center space-x-2 mb-8">
                <Layout className="h-6 w-6 text-[rgb(222,83,14)]" />
                <h2 className="text-2xl font-bold text-gray-900">Related Items</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedCards.map((relatedCard) => (
                  <Card key={relatedCard.id} {...relatedCard} />
                ))}
              </div>
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

export default DetailView;