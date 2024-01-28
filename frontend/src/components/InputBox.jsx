import React from 'react'

const InputBox = ({label, text, type, zodProperty, register}) => {
  return (
    <div className='my-3 space-y-1' >
      <label className='font-medium'>{label}</label>
      <input type={type || "text"} placeholder={text} className='border-2 border-slate-300 p-2 w-full outline-slate-400 text-gray-700' id={label} {...register(zodProperty)}/>
    </div>
  )
}

export default InputBox