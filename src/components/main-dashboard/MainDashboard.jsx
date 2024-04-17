import { useEffect, useState } from 'react';
import { Main } from '../main/Main';
import { Navbar } from '../navbar/Navbar';
import './MainDashboard.css';

export const MainDashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const mobileWidth = 1000;
  const width = screenSize.dynamicWidth;
  const isOnMobile = width <= mobileWidth;

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  const handleSetCurrentPage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, [screenSize]);

  return (
    <div
      className="app"
      style={isOnMobile ? { display: 'flex' } : {}}
    >
      {width <= mobileWidth ? (
        <></>
      ) : (
        <Navbar
          onSetCurrentPage={handleSetCurrentPage}
          currentPage={currentPage}
        />
      )}
      <Main
        isOnMobile={width <= mobileWidth}
        currentPage={currentPage}
        onSetCurrentPage={handleSetCurrentPage}
      />
    </div>
  );
};
