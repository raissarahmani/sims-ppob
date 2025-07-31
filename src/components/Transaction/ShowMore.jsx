import React from 'react'
import { useState } from 'react'

function ShowMore() {
    const [active, setActive] = useState(null);

    const months = [
        { name:"November"}, 
        { name:"Desember"}, 
        { name:"Januari"}, 
        { name:"Februari"}, 
        { name:"Maret"}, 
        { name:"April"}, 
        { name:"Mei"}, 
        { name:"Juni"}, 
        { name:"Juli"}, 
    ]

  return (
    <div className='px-30 py-5'>
      <div className='mt-5 mb-2 text-sm font-semibold'>Semua transaksi</div>
      <div className='flex flex-row gap-5'> 
        {months.map((month, i) => (
            <div 
                onClick={() => setActive(`${month.name}`)} 
                key={i}
                className={`text-sm cursor-pointer ${active === `${month.name}` ? "font-bold" : "text-[#c6c0c0] font-semibold"}`}
            >
                {month.name}
            </div>
        ))}
      </div>
    </div>
  )
}

export default ShowMore
