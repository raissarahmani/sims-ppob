import React from 'react'

function Banner({src, alt}) {

  return (
    <div className='py-5 banner flex-shrink-0'>
      <img src={src} alt={alt} className='text-sm' />
    </div>
  )
}

export default Banner
