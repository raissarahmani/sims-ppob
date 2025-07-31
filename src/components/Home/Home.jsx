import React from 'react'
import { useState, useRef } from 'react'
import Service from './Service'
import Banner from './Banner'

import ServiceList from '../../data/services.json'
import BannerList from '../../data/banner.json'

const images = import.meta.glob('../../assets/*.png', { eager: true })

function getImage(filename) {
  return images[`../../assets/${filename}`]?.default
}

function Home() {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [start, setStart] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStart(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - start) * 1.5; // speed factor
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const onMouseUp = () => setIsDragging(false);
  const onMouseLeave = () => setIsDragging(false);

  return (
    <div className='px-30 py-5'>
      <div className='flex flex-row justify-between items-center my-5'>
        {ServiceList.map((service) => (
          <Service key={service.id} image={getImage(service.image)} name={service.name} />
        ))}
      </div>
      <div className='text-xs font-semibold'>Temukan promo menarik</div>
      <div 
        className='flex flex-row gap-7 overflow-x-scroll no-scrollbar'
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        {BannerList.map((banner) => (
          <Banner key={banner.id} src={banner.image} alt={banner.name} />
        ))}
      </div>
    </div>
  )
}

export default Home