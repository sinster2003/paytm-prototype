import React from 'react'

const Heading = ({heading}) => {
  return (
    <div>
      <h1 className="font-bold text-4xl text-center">
        {heading}
      </h1>
    </div>
  )
}

export default Heading