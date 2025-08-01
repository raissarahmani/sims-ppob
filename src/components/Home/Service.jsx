import React from 'react'

function Service({image, name}) {
  return (
    <div className='transition-transform duration-300 hover:scale-105 hover:font-semibold cursor-pointer'>
      <div className='flex flex-col items-center w-[60px] h-[55px] text-xs text-center'>
        <img src={image} alt={name} className='w-[50px] h-[50px]' />
      </div>
      <div className='my-2 w-[60px] h-[30px] text-xs text-center'>{name}</div>
    </div>
  )
}

export default Service
