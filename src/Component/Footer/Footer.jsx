import React from 'react'

const Footer = (props) => {
    const { className, text } = props
  return (
    <div className={`max-w-[100vw] h-24 bg-white flex items-center justify-between ${className}`}>
        <h1>2024 - PT Kerjain</h1>
        <p>{text}</p>
        <p>0813-1988-3697</p>
    </div>
  )
}

export default Footer