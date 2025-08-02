import React from 'react'
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Service from './Service'
import Banner from './Banner'

import ServiceList from '../../data/services.json'
import BannerList from '../../data/banner.json'
import { selectService } from '../../redux/slices/transactionSlice'

const images = import.meta.glob('../../assets/*.png', { eager: true })

function getImage(filename) {
  return images[`../../assets/${filename}`]?.default
}

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)

  const chooseService = (service) => {
    dispatch(selectService({
      service_code: service.service_code,
      name: service.service_name,
      image: service.service_icon,
      price: service.service_tariff
    }))
    console.log(service)
    navigate("/transaction")
  }

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
        {!token ? (
          <>
          </>
        ) : (
          <>
            {ServiceList.map((service, i) => (
              <div key={i} onClick={() => chooseService(service)}>
                <Service image={getImage(service.service_icon)} name={service.service_name} />
              </div>
            ))}
          </>
        )}
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
        {BannerList.map((banner, i) => (
          <Banner key={i} src={banner.banner_image} alt={banner.banner_name} />
        ))}
      </div>
    </div>
  )
}

export default Home