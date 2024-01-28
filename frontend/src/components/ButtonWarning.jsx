import { Link } from 'react-router-dom'

const ButtonWarning = ({text, link, linkText}) => {
  return (
    <div className='text-center'>
      <p className='text-gray-700 py-1'>
        {text} 
        <Link to={link} className='underline'> 
          {linkText}
        </Link>
      </p>
    </div>
  )
}

export default ButtonWarning