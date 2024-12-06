import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CardData } from '../types';
import ContactModal from './ContactModal';

const Card: React.FC<CardData> = ({ id, title, description, image }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <div 
        onClick={handleCardClick}
        className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="w-full bg-[rgb(222,83,14)] text-white py-2 px-4 rounded-md hover:bg-[rgb(200,75,13)] transition-colors"
          >
            I Want This
          </button>
        </div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Card;