import { useEffect, useState } from 'react';

import {
  LG, MD, SM, XL, XXL
} from '~/common/constants';

const useWidthViewport = () => {
  const [viewportWidth, setViewportWidth] = useState<null | number>(null);
  const [currentWidth, setCurrentWidth] = useState({
    isSM: false,
    isMD: false,
    isLG: false,
    isXL: false,
    isXXL: false,
  });

  const {
    isSM, isMD, isLG, isXL, isXXL
  } = currentWidth;

  useEffect(() => {
    if (viewportWidth) {
      setCurrentWidth((prevWidth) => ({
        ...prevWidth,
        isSM: viewportWidth > SM,
        isMD: viewportWidth > MD && viewportWidth <= LG,
        isLG: viewportWidth > LG && viewportWidth <= XL,
        isXL: viewportWidth > XL && viewportWidth <= XXL,
        isXXL: viewportWidth > XXL,
      }));
    }
  }, [viewportWidth]);

  useEffect(() => {
    setViewportWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    // Update the viewport width when the window is resized
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isSM,
    isMD,
    isLG,
    isXL,
    isXXL,
    viewportWidth,
  };
};
export { useWidthViewport };
