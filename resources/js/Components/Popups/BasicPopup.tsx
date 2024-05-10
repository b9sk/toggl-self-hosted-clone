import React, { useState, useRef } from 'react';

interface AutoPlacedPopupProps {
  children: React.ReactNode;
}

const Popup: React.FC<AutoPlacedPopupProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: Event) => {
    if (popupRef.current &&!popupRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleButtonClick = () => {
    setIsOpen(true);
    document.addEventListener('mousedown', handleClickOutside);
  };

  const handleCloseClick = () => {
    setIsOpen(false);
    document.removeEventListener('mousedown', handleClickOutside);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Show Popup</button>
      {isOpen && (
        <div
          ref={popupRef}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'lightgrey',
            padding: '20px',
            zIndex: 1000,
          }}
        >
          {children}
          <button onClick={handleCloseClick}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Popup;
