import React from 'react'
import { useState, useRef } from 'react'
import Service from './Service'
import Banner from './Banner'

import Game from '../../assets/Game.png'
import Kurban from '../../assets/Kurban.png'
import Listrik from '../../assets/Listrik.png'
import Musik from '../../assets/Musik.png'
import PaketData from '../../assets/PaketData.png'
import PBB from '../../assets/PBB.png'
import PDAM from '../../assets/PDAM.png'
import PGN from '../../assets/PGN.png'
import Pulsa from '../../assets/Pulsa.png'
import Televisi from '../../assets/Televisi.png'
import Makanan from '../../assets/VoucherMakanan.png'
import Zakat from '../../assets/Zakat.png'

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

  const services = [
    { image: PBB, name: 'PBB' },
    { image: Listrik, name: 'Listrik' },
    { image: Pulsa, name: 'Pulsa' },
    { image: PDAM, name: 'PDAM' },
    { image: PGN, name: 'PGN' },
    { image: Televisi, name: 'TV Langganan' },
    { image: Musik, name: 'Musik' },
    { image: Game, name: 'Voucher Game' },
    { image: Makanan, name: 'Voucher Makanan' },
    { image: Kurban, name: 'Kurban' },
    { image: Zakat, name: 'Zakat' },
    { image: PaketData, name: 'Paket Data' },
  ]

  const banners = [
    { src: '/Banner1.png', alt:'Saldo Gratis'},
    { src: '/Banner2.png', alt:'Diskon Listrik'},
    { src: '/Banner3.png', alt:'Promo Makan'},
    { src: '/Banner4.png', alt:'Cashback 25%'},
    { src: '/Banner5.png', alt:'Buy 1 Get 2'},
  ]

  return (
    <div className='px-30 py-5'>
      <div className='flex flex-row justify-between items-center my-5'>
        {services.map((service, i) => (
          <Service key={i} image={service.image} name={service.name} />
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
        {banners.map((banner, i) => (
          <Banner key={i} src={banner.src} alt={banner.alt} />
        ))}
      </div>
    </div>
  )
}

export default Home