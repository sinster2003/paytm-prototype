import React from 'react'

const SubHeading = ({subHeading}) => {
  return (
    <div className='flex justify-center items-center text-center'>
      <h2 className="text-gray-500 my-2 text-base w-4/5 ">
        {subHeading}
      </h2>
    </div>
  )
}

export default SubHeading