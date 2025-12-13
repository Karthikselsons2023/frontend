import React from 'react'

const Selector = (props) => {
  return (
    <div className='px-3 bg-[#edebff] inline-flex whitespace-nowrap items-center justify-center text-sm py-[5px] ml-3 mt-3 rounded-full cursor-pointer hover:bg-[#d6d4ff]'>
        {props.label}
    </div>
  )
}

export default Selector