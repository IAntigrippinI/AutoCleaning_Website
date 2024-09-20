import React, { useState, useEffect } from 'react';

// Хук useDeviceDetect освободит вас от забот по определению типа устройства
const useDeviceDetect = () => {
    let mobileMaxSize = 500;
    let tabletMaxSize = 1280;
    const [isMobile, setIsMobile] = useState(window.innerWidth < mobileMaxSize);
    const [isTablet, setIsTablet] = useState(window.innerWidth >= mobileMaxSize && window.innerWidth < tabletMaxSize);

    useEffect(() => {
        // Отслеживаем изменение размера экрана здесь, моментально реагируя на любые его изменения
        const handleResize = () => setIsMobile(window.innerWidth < mobileMaxSize);
        window.addEventListener('resize', handleResize);
        // Непременно удаляем обработчик, чтобы предотвратить утечку памяти
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        // Отслеживаем изменение размера экрана здесь, моментально реагируя на любые его изменения
        const handleResize = () => setIsTablet(window.innerWidth >= mobileMaxSize && window.innerWidth < tabletMaxSize);
        window.addEventListener('resize', handleResize);
        // Непременно удаляем обработчик, чтобы предотвратить утечку памяти
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { isMobile, isTablet };
};

export default useDeviceDetect;