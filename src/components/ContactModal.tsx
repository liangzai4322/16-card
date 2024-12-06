import React from 'react';
import { X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-sm w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          
          <div className="bg-gray-100 w-48 h-48 mx-auto mb-4 flex items-center justify-center">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://example.com"
              alt="Contact QR Code"
              className="w-full h-full"
            />
          </div>
          
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[rgb(222,83,14)] hover:text-[rgb(200,75,13)] underline"
          >
            Visit our website
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;