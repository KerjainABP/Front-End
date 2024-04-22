import React from 'react'

const CardMarque = (props) => {
    const {nama, lokasi} = props
  return (
    <div className='bg-[#051A49] flex items-center gap-4 px-6 py-3 rounded-lg'>
        <div className='bg-white rounded-full w-10 h-10 ' >

        </div>
        <div className='text-white'>
            <h1>{nama}</h1>
        </div>
    </div>
  )
}

export default CardMarque