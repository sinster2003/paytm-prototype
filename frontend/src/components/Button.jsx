import React from 'react'

const Button = ({buttonText}) => {
  return (
    <div>
      <button type="submit" className="bg-slate-800 text-gray-100 p-2 w-full rounded-md">
        {buttonText}
      </button>
    </div>
  )
}

export default Button